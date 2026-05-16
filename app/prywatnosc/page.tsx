import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { ShieldCheck, Lock, Database, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Polityka prywatności — WindykatorStop.pl",
  description:
    "Nie używamy ciasteczek śledzących. Wszystkie dane formularzy są szyfrowane. Pełna transparentność.",
};

export default function PrywatnoscPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <Link href="/" className="text-sm text-stone-500 hover:text-teal-600 transition-colors mb-6 inline-block">
            ← Wróć do strony głównej
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pełna transparentność
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-3">Polityka prywatności</h1>
            <p className="text-stone-500 text-lg">
              W skrócie: nie śledzimy Cię, nie sprzedajemy danych, nie używamy ciasteczek reklamowych.
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { icon: Cookie, title: "Bez ciasteczek", desc: "Żadnych ciasteczek śledzących. Brak banera RODO bo nie ma czego pytać." },
              { icon: Database, title: "Twoje dane = Twój telefon", desc: "Mapa Długów i kalkulator zapisują dane tylko w Twojej przeglądarce." },
              { icon: Lock, title: "Szyfrowanie", desc: "Wszystkie formularze (lead, prawnicy, praca) przez HTTPS i Resend." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-stone-100 p-5">
                <Icon className="w-6 h-6 text-teal-600 mb-2" />
                <h3 className="font-bold text-stone-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <article className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-10 space-y-6 text-stone-700 text-base leading-relaxed">

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">1. Kto przetwarza Twoje dane</h2>
              <p>WindykatorStop.pl — projekt non-profit z siedzibą w Polsce. Kontakt: <a href="mailto:pomoc@windykatorstop.pl" className="text-teal-600 underline">pomoc@windykatorstop.pl</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">2. Jakie dane zbieramy</h2>
              <p className="mb-2"><strong>Anonimowe statystyki ruchu (Plausible Analytics):</strong></p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Ile osób odwiedziło stronę</li>
                <li>Z jakiego kraju (nie miasta)</li>
                <li>Z jakiej przeglądarki (Chrome, Safari...)</li>
                <li>Które strony są najczęściej czytane</li>
              </ul>
              <p className="mb-2 text-sm text-stone-500">
                Plausible <strong>nie używa ciasteczek</strong> i nie zbiera danych osobowych — to jego główna cecha.
                Nie wiemy kim jesteś, skąd dokładnie wchodzisz ani co klikałeś indywidualnie.
              </p>
              <p className="mt-3 mb-2"><strong>Dane formularzy (tylko gdy sam(a) je wypełnisz):</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Bezpłatna ekspertyza</strong> + lead do prawnika: imię, email, telefon, miejscowość — przekazywane wyłącznie zweryfikowanemu prawnikowi (po Twojej zgodzie)</li>
                <li><strong>Zgłoszenie prawnika:</strong> dane zawodowe + kontakt — do weryfikacji</li>
                <li><strong>Ogłoszenie pracy:</strong> dane pracodawcy + ogłoszenie — do moderacji</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">3. Czego NIE robimy</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Nie używamy Google Analytics, Facebook Pixela ani innych trackerów</li>
                <li>❌ Nie sprzedajemy danych osobom trzecim</li>
                <li>❌ Nie zapisujemy Twoich pytań do asystenta AI</li>
                <li>❌ Nie przechowujemy danych z Mapy Długów ani kalkulatora przedawnienia — wszystko zostaje w Twojej przeglądarce</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">4. Asystent AI</h2>
              <p>Asystent AI używa modelu Claude od firmy Anthropic. Twoje pytania są wysyłane do API Anthropic w celu wygenerowania odpowiedzi i nie są przechowywane na naszych serwerach. Zalecamy nie podawać szczegółowych danych osobowych w czacie.</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">5. localStorage (pamięć przeglądarki)</h2>
              <p>Mapa Długów zapisuje wpisane przez Ciebie dane w pamięci Twojej przeglądarki (localStorage). Te dane nigdy nie opuszczają Twojego urządzenia. Możesz je w każdej chwili wyczyścić przyciskiem &quot;Wyczyść wszystko&quot; lub w ustawieniach przeglądarki.</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">6. Twoje prawa (RODO)</h2>
              <p>Masz prawo do:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>dostępu do swoich danych</li>
                <li>sprostowania nieprawidłowych danych</li>
                <li>usunięcia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
                <li>ograniczenia przetwarzania</li>
                <li>sprzeciwu wobec przetwarzania</li>
                <li>złożenia skargi do Prezesa UODO</li>
              </ul>
              <p className="mt-3">Aby skorzystać z tych praw, napisz na <a href="mailto:pomoc@windykatorstop.pl" className="text-teal-600 underline">pomoc@windykatorstop.pl</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">7. Bezpieczeństwo</h2>
              <p>Strona działa wyłącznie przez HTTPS. Formularze leadowe przekazywane są przez bezpieczne API. Dane mailowe wysyłane są przez Resend z szyfrowaniem.</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-stone-900 mb-2">8. Zmiany w polityce</h2>
              <p>O istotnych zmianach poinformujemy na stronie głównej. Aktualna wersja: {new Date().toLocaleDateString("pl-PL")}.</p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
