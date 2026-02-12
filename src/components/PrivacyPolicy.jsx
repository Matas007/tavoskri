import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { revokeConsent } from './CookieConsentBanner';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const [revoked, setRevoked] = useState(false);

  const handleRevoke = () => {
    revokeConsent();
    setRevoked(true);
    setTimeout(() => window.location.reload(), 1800);
  };

  return (
    <>
      <SEO
        title="Slapukų ir privatumo politika - Tavo Skriptas"
        description="Tavo Skriptas slapukų ir privatumo politika. Sužinokite, kaip naudojame slapukus ir saugome jūsų duomenis."
        keywords="slapukai, privatumas, duomenų apsauga, Tavo Skriptas, cookie policy, GDPR"
      />
      <main className="privacy-page">
        <div className="privacy-card uiverse-card">
          <div className="card__border" aria-hidden="true" />
          <h1 className="privacy-title">Slapukų ir privatumo politika</h1>
          <p className="privacy-updated">
            Paskutinį kartą atnaujinta: {new Date().toLocaleDateString('lt-LT')}
          </p>

          <section className="privacy-section">
            <h2>1. Įvadas</h2>
            <p>
              Tavo Skriptas (toliau – „mes“, „mūsų“) gerbia jūsų privatumą. Ši politika paaiškina,
              kaip naudojame slapukus (cookies) ir kaip tvarkome jūsų duomenis lankantis mūsų
              svetainę.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Kas yra slapukai?</h2>
            <p>
              Slapukai – tai maži tekstiniai failai, kuriuos svetainė išsaugo jūsų įrenginyje
              (kompiuteryje, telefone ar planšetėje). Jie padeda svetainei prisiminti jūsų
              nustatymus arba atpažinti grįžusį lankytoją.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. Kokius slapukus naudojame?</h2>
            <p>Mūsų svetainėje naudojami šie slapukai:</p>
            <ul className="privacy-list">
              <li>
                <strong>Sutikimo pasirinkimo slapukas (ts_cookie_consent)</strong> – būtinas
                slapukas, kuris leidžia prisiminti jūsų pasirinkimą (sutikote arba atmetėte),
                kad slapukų juosta nebūtų rodoma kiekvieno apsilankymo metu. Slapukas galioja iki
                180 dienų.
              </li>
              <li>
                <strong>Muzikos nustatymo slapukas (ts_bg_music)</strong> – funkcinis slapukas,
                kuris (tik jums sutikus) leidžia prisiminti, ar foninė muzika palikta įjungta ar
                išjungta. Slapukas galioja iki 180 dienų.
              </li>
              <li>
                <strong>Analitiniai ir rinkodaros slapukai</strong> – <strong>nenaudojame</strong>.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Slapukų valdymas ir atšaukimas</h2>
            <p>
              Naršyklėje galite ištrinti slapukus arba riboti jų naudojimą per naršyklės
              nustatymus. Taip pat galite bet kada atšaukti sutikimą su mūsų slapukais – tada
              ištrinsime išsaugotą sutikimą ir funkcinį muzikos nustatymo slapuką. Vėliau galėsite
              vėl sutikti per slapukų juostą.
            </p>
            <div className="privacy-revoke">
              <button
                type="button"
                className="privacy-revoke-btn"
                onClick={handleRevoke}
                disabled={revoked}
                aria-label="Atšaukti slapukų sutikimą"
              >
                {revoked ? 'Sutikimas atšauktas' : 'Atšaukti slapukus'}
              </button>
              {revoked && (
                <p className="privacy-revoke-msg">Sutikimas atšauktas. Puslapis bus atnaujintas.</p>
              )}
            </div>
          </section>

          <section className="privacy-section">
            <h2>5. Asmens duomenų tvarkymas</h2>
            <p>
              Renkame tik tuos duomenis, kuriuos pateikiate savanoriškai (pvz., per kontaktų
              formą ar susitikimo užklausą). Šiuos duomenis naudojame tik susisiekti su jumis ir
              teikti paslaugas. Jų neperduodame trečiesiems prekybos ar rinkodaros tikslais be
              jūsų sutikimo.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Jūsų teisės</h2>
            <p>
              Pagal BDAR turite teisę žinoti, kokius duomenis turime, juos pataisyti ar ištrinti,
              apriboti tvarkymą ir paneigti sutikimą. Klausimams rašykite:{' '}
              <a href="mailto:info@tavoskriptas.lt">info@tavoskriptas.lt</a>.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Pakeitimai</h2>
            <p>
              Šią politiką galime atnaujinti. Apie reikšmingus pakeitimus pranešime svetainėje
              arba el. paštu. Tęsdami naudotis svetaine po pakeitimų, sutinkate su atnaujinta
              politika.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Kontaktai</h2>
            <p>
              Klausimams dėl slapukų ar privatumo: <a href="mailto:info@tavoskriptas.lt">info@tavoskriptas.lt</a>,{' '}
              <a href="tel:+37063792154">+370 637 92 154</a>.
            </p>
          </section>

          <div className="privacy-back">
            <Link to="/" className="privacy-back-link">← Grįžti į pradžią</Link>
          </div>
        </div>
      </main>
    </>
  );
}
