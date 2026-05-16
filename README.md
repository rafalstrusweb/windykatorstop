# WindykatorStop.pl

Bezpłatna platforma wsparcia dla osób w pętli zadłużenia w Polsce. Misja: dostarczyć darmowe narzędzia prawne i wsparcie psychologiczne osobom, których nie stać na kancelarię.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Vercel Edge · Anthropic Claude API · Resend · Plausible Analytics

---

## Narzędzia dostępne na platformie

| Narzędzie | URL | Co robi |
|---|---|---|
| Generator Pism | `/generator-pism` | RODO cofnięcie zgód, sprzeciw EPU, wezwanie do zaprzestania nękania |
| Skrypt Rozmowy | `/skrypt-rozmowy` | 6 sytuacji × gotowe zdania do użycia podczas rozmowy |
| EPU Wizard | `/epu` | 5-krokowy guide ze sprzeciwem od nakazu zapłaty |
| Bezpłatna ekspertyza | `/ekspertyza` | 5-pytaniowy scoring + dopasowanie prawnika |
| Kalkulator przedawnienia | `/#kalkulator` | Sprawdź czy dług przedawniony |
| Mapa Długów | `/#mapa-dlugow` | Plan spłaty (lawina / kula śnieżna) + alerty przedawnienia |
| Baza Wiedzy | `/wiedza` | 6 artykułów SEO-zoptymalizowanych |
| Tablica Pracy | `/praca` | Oferty bez sprawdzania BIK/KRD |
| Dla prawników | `/dla-prawnikow` | Lead-gen partnership (CCBE-compliant) |

---

## Lokalne uruchomienie

```bash
# 1. Klonuj
git clone https://github.com/rafalstrusweb/windykatorstop.git
cd windykatorstop

# 2. Instaluj
npm install

# 3. Konfiguruj env (opcjonalne dla deva)
cp .env.local.example .env.local
# Edytuj .env.local — minimum: ANTHROPIC_API_KEY dla asystenta AI

# 4. Uruchom
npm run dev
# → http://localhost:3000
```

Bez kluczy API platforma działa, ale:
- Asystent AI zwraca komunikat "chwilowo niedostępny"
- Lead-formularze logują do konsoli (zamiast wysyłać email)
- Plausible Analytics jest wyłączony

---

## Deploy na Vercel

### 1. Połącz repo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rafalstrusweb/windykatorstop)

Lub manualnie:
1. [vercel.com](https://vercel.com) → **Add New Project**
2. Wybierz repo `windykatorstop` z GitHuba
3. Framework: **Next.js** (auto-detected)
4. Build command: domyślny (`next build`)

### 2. Skonfiguruj zmienne środowiskowe

W Vercel dashboard → **Settings → Environment Variables**:

| Zmienna | Wymagana? | Opis | Gdzie zdobyć |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Krytyczne | Asystent AI | [console.anthropic.com](https://console.anthropic.com) |
| `RESEND_API_KEY` | 🟡 Zalecane | Wysyłka emaili (lead, prawnicy, praca) | [resend.com](https://resend.com) |
| `ADMIN_EMAIL` | 🟡 Zalecane | Email do otrzymywania zgłoszeń | własny |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | 🟢 Opcjonalne | Domena dla analityki | własna |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | 🟢 Opcjonalne | Host Plausible (default: plausible.io) | własny self-host |

### 3. Skonfiguruj domenę

W Vercel dashboard → **Settings → Domains**:
- Dodaj `windykatorstop.pl` i `www.windykatorstop.pl`
- Skonfiguruj DNS u rejestratora (A record / CNAME jak pokaże Vercel)
- HTTPS jest automatyczny (Let's Encrypt)

### 4. Pre-launch checklist

- [ ] Wszystkie zmienne env ustawione (sprawdź `/api/chat` na produkcji)
- [ ] Resend domain weryfikowana (`leads@windykatorstop.pl` musi wysyłać)
- [ ] DNS rozpropagowane (`dig windykatorstop.pl`)
- [ ] Plausible: domena dodana w panelu plausible.io
- [ ] Test PWA install na realnym Androidzie + iPhone
- [ ] Test OG image: udostępnij `/wiedza/sprzeciw-epu-14-dni-instrukcja` na Facebook
- [ ] Test generatora pism z polskimi znakami (drukowanie do PDF)
- [ ] Test offline na zainstalowanej PWA (samolot mode)
- [ ] Submit sitemap w Google Search Console: `https://windykatorstop.pl/sitemap.xml`
- [ ] Skontaktuj się z 3 NGO (Legitimis, Togatus, Cognosco) z prośbą o link zwrotny

---

## Architektura

```
windykatorstop/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Globalne meta, fonty, Analytics, PWARegister
│   ├── page.tsx               # Strona główna
│   ├── manifest.ts            # PWA manifest
│   ├── sitemap.ts             # XML sitemap
│   ├── robots.ts              # robots.txt
│   ├── opengraph-image.tsx    # Default OG image
│   ├── not-found.tsx          # Custom 404
│   ├── generator-pism/        # Generator pism
│   ├── skrypt-rozmowy/        # Skrypt rozmowy
│   ├── epu/                   # EPU Wizard
│   ├── ekspertyza/            # Case assessment
│   ├── praca/                 # Tablica pracy
│   ├── dla-prawnikow/         # Landing dla prawników
│   ├── prywatnosc/            # Polityka prywatności
│   ├── wiedza/
│   │   ├── page.tsx           # Lista artykułów
│   │   └── [slug]/
│   │       ├── page.tsx       # Strona artykułu
│   │       └── opengraph-image.tsx  # Dynamiczny OG per artykuł
│   └── api/
│       ├── chat/              # Asystent AI (Anthropic)
│       ├── lead/              # Lead-gen → email
│       ├── lawyer-signup/     # Zgłoszenia prawników
│       └── job-submit/        # Ogłoszenia pracy
├── components/                # Wszystkie React komponenty
├── content/                   # Statyczna treść (artykuły, oferty pracy)
├── lib/                       # Helpers (tracking)
├── public/                    # Static assets, ikony PWA, service worker
└── next.config.mjs            # Security headers + redirects
```

---

## Bezpieczeństwo

- **Security headers** w `next.config.mjs`: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Brak ciasteczek śledzących** — Plausible jest cookieless
- **localStorage** używany tylko dla Mapy Długów (dane zostają w przeglądarce użytkownika)
- **HTTPS-only** — Vercel wymusza automatycznie
- **Brak zbierania PESEL/danych identyfikujących** — generator pism zapisuje tylko lokalnie

---

## Monetyzacja (CCBE-compliant)

Platforma jest non-profit, ale zachowuje zrównoważony model przychodów:

1. **Lead generation do prawników** (`/dla-prawnikow`)
   - Tylko zweryfikowani radcowie/adwokaci
   - Prowizja tylko od pozytywnego rozstrzygnięcia sprawy
   - Pierwsza konsultacja klienta zawsze bezpłatna
   - Zgodne z wytycznymi CCBE (Rada Adwokatur Europy)

2. **Promowane ogłoszenia pracy** (przyszłość)
   - Pracodawcy płacą za wyróżnienie (~49 zł/mies)
   - Same oferty zawsze bezpłatne dla szukających

3. **Dotacje i granty UE**
   - Projekt non-profit, kwalifikujący się do funduszy społecznych

**Czego nigdy nie robimy:**
- ❌ Paywall na narzędzia
- ❌ Reklamy firm pożyczkowych
- ❌ Sprzedaż danych
- ❌ Abonament "ochronny"

---

## Licencja

MIT — kod open source. Treści edukacyjne i wzory pism CC BY-SA 4.0.

---

## Wsparcie

- **Bug / pomysł:** [GitHub Issues](https://github.com/rafalstrusweb/windykatorstop/issues)
- **Kontakt:** pomoc@windykatorstop.pl

---

**Zrobione z ❤️ dla ludzi w trudnej chwili.**
