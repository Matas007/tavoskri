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
              Tavo Skriptas (toliau – „mes“, „mūsų“) gerbia jūsų privatumą. Duomenų valdytojas –{' '}
              <strong>Matas Kornelijus Vanagas</strong>, veikiantis prekės ženklo „Tavo Skriptas“
              vardu. Ši politika paaiškina, kaip naudojame slapukus (cookies) ir kaip tvarkome jūsų
              duomenis lankantis mūsų svetainėje.
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
            <h3>5.1. Renkami asmens duomenys</h3>
            <p>
              Renkame tik tuos duomenis, kuriuos pateikiate savanoriškai, pavyzdžiui, pildydami
              susitikimo/booking formą ar kreipdamiesi el. paštu. Tai gali būti:
            </p>
            <ul className="privacy-list">
              <li>vardas, pavardė;</li>
              <li>el. pašto adresas ir telefono numeris;</li>
              <li>įmonės pavadinimas (jei jį pateikiate);</li>
              <li>pasirinkta konsultacijos data ir laikas;</li>
              <li>laisvos formos žinutė apie jūsų poreikius;</li>
              <li>techninė informacija, kurią gali rinkti mūsų paslaugų tiekėjai (pvz., IP adresas, data ir laikas saugumo ir piktnaudžiavimo prevencijos tikslais).</li>
            </ul>

            <h3>5.2. Duomenų tvarkymo tikslai</h3>
            <p>Jūsų duomenis tvarkome šiais tikslais:</p>
            <ul className="privacy-list">
              <li>atsakyti į jūsų užklausas ir susisiekti dėl konsultacijos ar paslaugų pasiūlymo;</li>
              <li>planuoti ir administruoti susitikimų grafiką;</li>
              <li>užtikrinti mūsų paslaugos saugumą (pvz., apsisaugoti nuo šlamšto, piktnaudžiavimo ar automatizuotų užklausų).</li>
            </ul>

            <h3>5.3. Teisinis duomenų tvarkymo pagrindas</h3>
            <p>
              Jūsų duomenis tvarkome šiais teisiniais pagrindais:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>Sutarties vykdymas arba veiksmai prieš sudarant sutartį</strong> – kai
                pateikiate užklausą dėl paslaugų, tvarkome duomenis, kad galėtume su jumis
                susisiekti ir pasiūlyti sprendimus.
              </li>
              <li>
                <strong>Teisėtas interesas</strong> – siekiant apsaugoti mūsų paslaugą ir
                infrastruktūrą nuo piktnaudžiavimo, šlamšto ar DDoS tipo atakų.
              </li>
              <li>
                <strong>Sutikimas</strong> – jei ateityje pasiūlysime papildomas funkcijas, kurios
                reikalautų atskiro sutikimo (pvz., nebūtinus slapukus ar naujienlaiškį), apie tai
                informuosime atskirai.
              </li>
            </ul>
            <p>
              Jūsų asmens duomenis saugome ne ilgiau, nei to reikia aukščiau nurodytiems tikslams
              pasiekti, arba tiek, kiek reikalauja taikytini teisės aktai (pvz., apskaitos ar
              teisinių ginčų atvejais).
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Duomenų saugumas</h2>
            <p>
              Dedame pagrįstas technines ir organizacines priemones, kad apsaugotume jūsų asmens
              duomenis nuo neteisėto ar atsitiktinio sunaikinimo, praradimo, pakeitimo, atskleidimo
              ar bet kokio kito neteisėto tvarkymo. Naudojame šifruotą ryšį (HTTPS) ir patikimų
              paslaugų teikėjų infrastruktūrą.
            </p>
            <p>
              Prieiga prie duomenų suteikiama tik tiems asmenims, kuriems jos reikia savo funkcijoms
              atlikti, ir tik pagal „būtina žinoti“ principą. Vis dėlto jokia interneto ar elektroninių
              sistemų technologija nėra visiškai saugi, todėl negalime garantuoti absoliutaus
              saugumo.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Vaikų asmens duomenys ir privatumas</h2>
            <p>
              Mūsų paslaugos nėra skirtos jaunesniems nei 14 metų asmenims. Mes sąmoningai nerenkame
              asmeninės informacijos iš jaunesnių nei 14 metų asmenų. Jei esate tėvai arba globėjai
              ir žinote, kad jūsų vaikas pateikė mums asmens duomenis, susisiekite su mumis el.
              paštu{' '}
              <a href="mailto:info@tavoskriptas.lt">info@tavoskriptas.lt</a>.
            </p>
            <p>
              Jei sužinome, kad surinkome jaunesnių nei 14 metų asmenų asmens duomenis negavę
              tinkamo tėvų ar globėjų sutikimo, imamės priemonių pašalinti šią informaciją iš savo
              sistemų.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Jūsų teisės</h2>
            <p>Pagal BDAR Jūs turite šias teises:</p>
            <ul className="privacy-list">
              <li>
                <strong>Teisė susipažinti</strong> – gauti informaciją, ar tvarkome jūsų asmens
                duomenis, ir, jei taip, susipažinti su tvarkomais duomenimis.
              </li>
              <li>
                <strong>Teisė ištaisyti</strong> – reikalauti, kad ištaisytume netikslius ar
                neišsamius jūsų duomenis.
              </li>
              <li>
                <strong>Teisė ištrinti</strong> – prašyti ištrinti jūsų duomenis („teisė būti
                pamirštam“), kai jie nebereikalingi arba tvarkomi neteisėtai.
              </li>
              <li>
                <strong>Teisė apriboti tvarkymą</strong> – reikalauti laikinai sustabdyti jūsų
                duomenų tvarkymą tam tikromis aplinkybėmis.
              </li>
              <li>
                <strong>Teisė į duomenų perkeliamumą</strong> – gauti jūsų pateiktus duomenis
                susistemintu, įprastai naudojamu ir kompiuterio skaitomu formatu ir, jei techniškai
                įmanoma, perduoti juos kitam duomenų valdytojui.
              </li>
              <li>
                <strong>Teisė nesutikti</strong> – bet kada nesutikti su jūsų duomenų tvarkymu,
                jei jis grindžiamas mūsų teisėtais interesais.
              </li>
              <li>
                <strong>Teisė atšaukti sutikimą</strong> – jei duomenys tvarkomi remiantis
                sutikimu, galite jį bet kada atšaukti, nesumažinant iki atšaukimo momento atlikto
                tvarkymo teisėtumo.
              </li>
            </ul>
            <p>
              Dėl savo teisių įgyvendinimo kreipkitės el. paštu{' '}
              <a href="mailto:info@tavoskriptas.lt">info@tavoskriptas.lt</a>.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Pakeitimai</h2>
            <p>
              Šią politiką galime atnaujinti. Apie reikšmingus pakeitimus pranešime svetainėje
              arba el. paštu. Tęsdami naudotis svetaine po pakeitimų, sutinkate su atnaujinta
              politika.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Kontaktai</h2>
            <p>
              Klausimams dėl slapukų ar privatumo: <a href="mailto:info@tavoskriptas.lt">info@tavoskriptas.lt</a>,{' '}
              <a href="tel:+37069420771">+370 694 20 771</a>.
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
