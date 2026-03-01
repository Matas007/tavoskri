import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay, addMonths, subMonths } from 'date-fns';
import { supabase } from '../lib/supabase';
import './BookingForm.css';

const COOLDOWN_MS = 60_000; // 60s tarp submit bandymų

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    booking_date: '',
    booking_time: '',
    message: '',
    _trap: '' // honeypot — botai užpildo, žmonės ne
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [fetchingTimes, setFetchingTimes] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [cooldownSec, setCooldownSec] = useState(0);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  // Refs for scrolling
  const timePickerRef = useRef(null);
  const cardRef = useRef(null);

  // Cooldown laikmatis
  useEffect(() => {
    if (cooldownUntil <= 0) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownSec(0);
        setCooldownUntil(0);
        clearInterval(interval);
      } else {
        setCooldownSec(remaining);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  // Fetch booked times when date is selected
  useEffect(() => {
    if (!formData.booking_date) {
      setBookedTimes([]);
      return;
    }

    const fetchBookedTimes = async () => {
      setFetchingTimes(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('booking_time')
          .eq('booking_date', formData.booking_date)
          .in('status', ['pending', 'confirmed']);

        if (error) throw error;

        const blockedSlots = new Set();
        (data || []).forEach(booking => {
          const bookedTime = booking.booking_time.substring(0, 5); // "14:30:00" -> "14:30"
          blockedSlots.add(bookedTime);
        });

        setBookedTimes(Array.from(blockedSlots));
      } catch (err) {
        console.error('Error fetching booked times:', err);
        setBookedTimes([]);
      } finally {
        setFetchingTimes(false);
      }
    };

    fetchBookedTimes();
  }, [formData.booking_date]);

  // Scroll to top when switching steps (prevents staying at bottom)
  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Add empty cells for days before month starts
    const startDay = start.getDay(); // 0 = Sunday
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1; // Convert to Monday = 0
    const emptyDays = Array(adjustedStartDay).fill(null);
    
    return [...emptyDays, ...days];
  };

  const calendarDays = generateCalendarDays();
  const today = startOfDay(new Date());

  // Lithuanian month names
  const getMonthName = (date) => {
    const months = [
      'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
      'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: jei _trap užpildytas — botas, tyliai ignoruojame
    if (formData._trap) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      return;
    }

    // Client-side cooldown
    if (Date.now() < cooldownUntil) {
      setError(`Palaukite ${cooldownSec}s prieš bandant dar kartą.`);
      return;
    }

    if (!privacyAccepted) {
      setError('Prašome sutikti su privatumo politika prieš pateikiant užklausą.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // 1. Check if the selected time is already booked
      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('booking_time, id')
        .eq('booking_date', formData.booking_date)
        .in('status', ['pending', 'confirmed']);

      if (checkError) throw checkError;

      // Check if selected time is already booked
      if (existingBookings && existingBookings.length > 0) {
        const selectedTime = formData.booking_time;

        for (const booking of existingBookings) {
          const bookedTime = booking.booking_time.substring(0, 5); // "14:30:00" -> "14:30"
          
          // Check if the exact time is booked
          if (bookedTime === selectedTime) {
            setError(`❌ Laikas ${selectedTime} jau užimtas! Pasirinkite kitą laiką.`);
            setLoading(false);
            return;
          }
        }
      }

      // 2. If available, create the booking (do not send _trap — not a DB column)
      const { name, email, phone, company, booking_date, booking_time, message } = formData;
      const { data, error: submitError } = await supabase
        .from('bookings')
        .insert([
          {
            name,
            email,
            phone,
            company,
            booking_date,
            booking_time,
            message,
            status: 'pending'
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        booking_date: '',
        booking_time: '',
        message: '',
        _trap: ''
      });
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      
      // Scroll to top
      setTimeout(() => {
        const card = document.querySelector('.booking-form-card');
        if (card) {
          card.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Klaida išsaugant užsakymą');
      setCooldownUntil(Date.now() + COOLDOWN_MS);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle date selection - scroll to time picker
  const handleDateSelect = (dateStr) => {
    setFormData(prev => ({ ...prev, booking_date: dateStr }));
    
    // Scroll to time picker after a short delay
    setTimeout(() => {
      if (timePickerRef.current) {
        timePickerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }
    }, 100);
  };

  // Handle time selection - go to step 2
  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, booking_time: time }));
    
    // Automatically go to step 2 after selecting time
    setTimeout(() => {
      setStep(2);
    }, 300);
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form-card" ref={cardRef}>
        <Link to="/" className="close-button" aria-label="Grįžti į pagrindinį">
          ✕
        </Link>
        <div className="booking-steps">
          <div className={`step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Pasirink laiką</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Tavo duomenys</div>
          </div>
        </div>

        {success && (
          <div className="alert alert-success">
            ✅ Užklausa sėkmingai pateikta! Susisieksime netrukus.
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        {step === 1 && (
          <div className="date-time-picker">
            <h2 className="booking-form-title">Kada tau patogus laikas?</h2>
            <p className="booking-form-subtitle">Pasirink datą ir laiką skambučiui</p>

            <div className="calendar-container">
              <div className="calendar-header">
                <button 
                  type="button"
                  className="calendar-nav"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  ←
                </button>
                <h3 className="calendar-month">
                  {getMonthName(currentMonth)}
                </h3>
                <button 
                  type="button"
                  className="calendar-nav"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  →
                </button>
              </div>

              <div className="calendar-weekdays">
                <div className="weekday">Pr</div>
                <div className="weekday">An</div>
                <div className="weekday">Tr</div>
                <div className="weekday">Kt</div>
                <div className="weekday">Pn</div>
                <div className="weekday">Št</div>
                <div className="weekday">Sk</div>
              </div>

              <div className="calendar-grid">
                {calendarDays.map((day, idx) => {
                  if (!day) {
                    return <div key={`empty-${idx}`} className="calendar-day empty" />;
                  }

                  const dateStr = format(day, 'yyyy-MM-dd');
                  const isPast = isBefore(startOfDay(day), today);
                  const isSelected = formData.booking_date === dateStr;
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isTodayDate = isToday(day);

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''} ${!isCurrentMonth ? 'other-month' : ''} ${isTodayDate ? 'today' : ''}`}
                      onClick={() => !isPast && handleDateSelect(dateStr)}
                      disabled={isPast}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>

            {formData.booking_date && (
              <div ref={timePickerRef}>
                <h3 className="time-title">Pasirink laiką</h3>
                {fetchingTimes ? (
                  <div className="loading-times">Kraunami laikai...</div>
                ) : (
                  <div className="time-grid">
                    {timeSlots.map((time, idx) => {
                      const isBooked = bookedTimes.includes(time);
                      return (
                        <button
                          key={idx}
                          type="button"
                          className={`time-card ${formData.booking_time === time ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                          onClick={() => !isBooked && handleTimeSelect(time)}
                          disabled={isBooked}
                        >
                          {time}
                          {isBooked && <span className="booked-badge">Užimta</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="booking-form">
            <h2 className="booking-form-title">Tavo duomenys</h2>
            <p className="booking-form-subtitle">
              Pasirinktas laikas: {format(new Date(formData.booking_date), 'yyyy-MM-dd')} | {formData.booking_time}
            </p>

            <div className="form-control">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder=" "
              />
              <label htmlFor="name" aria-label="Vardas, Pavardė">
                <span style={{ transitionDelay: '0ms' }}>V</span>
                <span style={{ transitionDelay: '50ms' }}>a</span>
                <span style={{ transitionDelay: '100ms' }}>r</span>
                <span style={{ transitionDelay: '150ms' }}>d</span>
                <span style={{ transitionDelay: '200ms' }}>a</span>
                <span style={{ transitionDelay: '250ms' }}>s</span>
                <span style={{ transitionDelay: '300ms' }}>,</span>
                <span style={{ transitionDelay: '350ms' }}> </span>
                <span style={{ transitionDelay: '400ms' }}>P</span>
                <span style={{ transitionDelay: '450ms' }}>a</span>
                <span style={{ transitionDelay: '500ms' }}>v</span>
                <span style={{ transitionDelay: '550ms' }}>a</span>
                <span style={{ transitionDelay: '600ms' }}>r</span>
                <span style={{ transitionDelay: '650ms' }}>d</span>
                <span style={{ transitionDelay: '700ms' }}>ė</span>
                <span style={{ transitionDelay: '750ms' }}> </span>
                <span style={{ transitionDelay: '800ms' }}>*</span>
              </label>
            </div>

            <div className="form-control">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder=" "
              />
              <label htmlFor="email" aria-label="El. paštas">
                <span style={{ transitionDelay: '0ms' }}>E</span>
                <span style={{ transitionDelay: '50ms' }}>l</span>
                <span style={{ transitionDelay: '100ms' }}>.</span>
                <span style={{ transitionDelay: '150ms' }}> </span>
                <span style={{ transitionDelay: '200ms' }}>p</span>
                <span style={{ transitionDelay: '250ms' }}>a</span>
                <span style={{ transitionDelay: '300ms' }}>š</span>
                <span style={{ transitionDelay: '350ms' }}>t</span>
                <span style={{ transitionDelay: '400ms' }}>a</span>
                <span style={{ transitionDelay: '450ms' }}>s</span>
                <span style={{ transitionDelay: '500ms' }}> </span>
                <span style={{ transitionDelay: '550ms' }}>*</span>
              </label>
            </div>

            <div className="form-control">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder=" "
              />
              <label htmlFor="phone" aria-label="Telefonas">
                <span style={{ transitionDelay: '0ms' }}>T</span>
                <span style={{ transitionDelay: '50ms' }}>e</span>
                <span style={{ transitionDelay: '100ms' }}>l</span>
                <span style={{ transitionDelay: '150ms' }}>e</span>
                <span style={{ transitionDelay: '200ms' }}>f</span>
                <span style={{ transitionDelay: '250ms' }}>o</span>
                <span style={{ transitionDelay: '300ms' }}>n</span>
                <span style={{ transitionDelay: '350ms' }}>a</span>
                <span style={{ transitionDelay: '400ms' }}>s</span>
                <span style={{ transitionDelay: '450ms' }}> </span>
                <span style={{ transitionDelay: '500ms' }}>*</span>
              </label>
            </div>

            <div className="form-control">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
                placeholder=" "
              />
              <label htmlFor="company" aria-label="Įmonė">
                <span style={{ transitionDelay: '0ms' }}>Į</span>
                <span style={{ transitionDelay: '50ms' }}>m</span>
                <span style={{ transitionDelay: '100ms' }}>o</span>
                <span style={{ transitionDelay: '150ms' }}>n</span>
                <span style={{ transitionDelay: '200ms' }}>ė</span>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="message">Žinutė</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Trumpai apie jūsų poreikius..."
              />
            </div>

            <div className="booking-privacy-consent">
              <label className="booking-privacy-label">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={e => setPrivacyAccepted(e.target.checked)}
                  required
                />
                <span>
                  Sutinku su{' '}
                  <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="booking-privacy-link">
                    privatumo politika
                  </Link>{' '}
                  ir duomenų tvarkymo sąlygomis *
                </span>
              </label>
            </div>

            {/* Honeypot: paslėptas nuo žmonių, botai užpildo */}
            <div className="booking-trap" aria-hidden="true">
              <label htmlFor="_trap">Palikite tuščią</label>
              <input
                type="text"
                id="_trap"
                name="_trap"
                value={formData._trap}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="animated-button animated-button--ghost animated-button--back"
                onClick={() => {
                  setStep(1);
                  setFormData(prev => ({ ...prev, booking_time: '' }));
                  // Scroll to top of the card
                  setTimeout(() => {
                    const card = document.querySelector('.booking-form-card');
                    if (card) {
                      card.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }, 50);
                }}
              >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
                <span className="text">Atgal</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </button>
              <button
                type="submit"
                className="animated-button"
                disabled={loading || cooldownSec > 0}
              >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
                <span className="text">
                  {loading ? 'Siunčiama...' : cooldownSec > 0 ? `Palaukite ${cooldownSec}s` : 'Patvirtinti'}
                </span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

