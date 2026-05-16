// Curated job listings — added manually after admin moderation.
// User-submitted listings come via /api/job-submit and are reviewed before publishing.

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  region: "mazowieckie" | "malopolskie" | "slaskie" | "dolnoslaskie" | "wielkopolskie" | "lodzkie" | "zdalnie" | "cala-polska" | "inne";
  type: "Pełen etat" | "Pół etatu" | "Umowa zlecenie" | "Elastyczne godziny" | "Zdalnie";
  category: "Fizyczna" | "Biurowa" | "Sprzedaż" | "Transport" | "Gastronomia" | "Inne";
  description: string;
  note: string; // np. "Bez wymagań formalnych"
  contact: string; // email lub telefon
  contactType: "email" | "phone";
  postedAt: string; // ISO
  noCheckCredit: boolean; // "nie sprawdzamy BIK/KRD"
  quickStart: boolean; // szybkie zatrudnienie
};

export const JOBS: Job[] = [
  {
    id: "j1",
    title: "Pracownik obsługi sprzątania",
    company: "MegaClean Sp. z o.o.",
    location: "Warszawa",
    region: "mazowieckie",
    type: "Pełen etat",
    category: "Fizyczna",
    description: "Sprzątanie biur i lokali komercyjnych. Bez wymagań formalnych, szkolenie w miejscu pracy.",
    note: "Przyjmujemy osoby wychodzące z trudności finansowych. Nie sprawdzamy BIK/KRD.",
    contact: "rekrutacja@megaclean-example.pl",
    contactType: "email",
    postedAt: "2026-05-10",
    noCheckCredit: true,
    quickStart: true,
  },
  {
    id: "j2",
    title: "Pomocnik na budowie — szkolenie w miejscu",
    company: "Budpol Sp. z o.o.",
    location: "Kraków",
    region: "malopolskie",
    type: "Pełen etat",
    category: "Fizyczna",
    description: "Prace pomocnicze, transport materiałów, podstawowe prace murarskie. Zaliczka na start możliwa.",
    note: "Zaliczka na start dostępna od pierwszego dnia.",
    contact: "+48 600 000 001",
    contactType: "phone",
    postedAt: "2026-05-08",
    noCheckCredit: true,
    quickStart: true,
  },
  {
    id: "j3",
    title: "Kierowca kat. B — rozliczenie tygodniowe",
    company: "LogiTrans",
    location: "Łódź / Trasa krajowa",
    region: "lodzkie",
    type: "Elastyczne godziny",
    category: "Transport",
    description: "Rozwoz przesyłek na terenie województwa łódzkiego. Auto zapewnione. Rozliczenie co tydzień.",
    note: "Szybkie zatrudnienie, wypłata co tydzień gotówką lub przelewem.",
    contact: "praca@logitrans-example.pl",
    contactType: "email",
    postedAt: "2026-05-05",
    noCheckCredit: true,
    quickStart: true,
  },
  {
    id: "j4",
    title: "Pakowacz / pakowaczka magazynowa",
    company: "Pakomat",
    location: "Wrocław",
    region: "dolnoslaskie",
    type: "Pełen etat",
    category: "Fizyczna",
    description: "Praca w magazynie e-commerce. Pakowanie zamówień, sortowanie. System 2-zmianowy.",
    note: "Premia frekwencyjna co miesiąc. Bez kar za nieobecność.",
    contact: "hr@pakomat-example.pl",
    contactType: "email",
    postedAt: "2026-05-12",
    noCheckCredit: true,
    quickStart: false,
  },
  {
    id: "j5",
    title: "Konsultant call center — praca zdalna",
    company: "TeleHelp",
    location: "Zdalnie z domu",
    region: "zdalnie",
    type: "Zdalnie",
    category: "Biurowa",
    description: "Obsługa klienta przez telefon. Potrzebny komputer i stabilne łącze. Szkolenie online.",
    note: "Praca z domu. Elastyczne godziny. Komputer do wypożyczenia.",
    contact: "rekrutacja@telehelp-example.pl",
    contactType: "email",
    postedAt: "2026-05-14",
    noCheckCredit: true,
    quickStart: false,
  },
  {
    id: "j6",
    title: "Pomoc kuchenna",
    company: "Restauracja Domowa",
    location: "Poznań",
    region: "wielkopolskie",
    type: "Pełen etat",
    category: "Gastronomia",
    description: "Przygotowanie posiłków, zmywanie, podstawowe prace kuchenne. Bez wymaganego doświadczenia.",
    note: "Posiłki w miejscu pracy bezpłatne. Premie świąteczne.",
    contact: "+48 600 000 002",
    contactType: "phone",
    postedAt: "2026-05-11",
    noCheckCredit: true,
    quickStart: true,
  },
];
