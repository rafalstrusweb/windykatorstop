// Articles data — based on research PDF.
// Each article uses template literals for safe Polish character handling.

export type Article = {
  slug: string;
  title: string;
  description: string; // for SEO meta + OG
  category: string;
  date: string; // ISO
  readMinutes: number;
  emoji: string;
  urgent?: boolean;
  excerpt: string; // for index card
  content: string; // HTML
  keywords: string[];
};

// ────────────────────────────────────────────────────────────────────────────

const a1: Article = {
  slug: "przedawnienie-dlugu-po-ilu-latach",
  title: "Przedawnienie długu — po ilu latach możesz przestać płacić?",
  description:
    "Chwilówka przedawnia się po 3 latach. Kredyt hipoteczny po 6. Sprawdź dokładne terminy i krytyczną pułapkę, która restartuje przedawnienie nawet wpłatą 10 zł.",
  category: "Prawo",
  date: "2026-05-10",
  readMinutes: 6,
  emoji: "⏳",
  excerpt:
    "Nie każdy dług trzeba spłacić. Niektóre już dawno są martwe prawnie — ale wystarczy jedna prośba o ugodę żeby ożywić zombie sprzed lat.",
  keywords: ["przedawnienie długu", "po ilu latach przedawnia się dług", "chwilówka przedawnienie", "kredyt przedawnienie"],
  content: `
<p class="lead">Jeśli Twój dług ma więcej niż 3 lata i od tego czasu nie miałeś żadnego kontaktu z wierzycielem — istnieje duża szansa, że jest już <strong>przedawniony</strong>. Oznacza to, że nikt nie może już skutecznie wymusić jego spłaty przed sądem. Tu jest wszystko co musisz wiedzieć — i jedna pułapka, która niszczy 9 na 10 dłużników.</p>

<h2>Czym jest przedawnienie długu?</h2>

<p>Przedawnienie to instytucja prawa cywilnego. Mówi: po upływie określonego czasu wierzyciel traci możliwość przymusowej windykacji długu przez sąd i komornika. Sam dług formalnie nie znika — staje się tzw. <em>zobowiązaniem naturalnym</em>. Jeśli zapłacisz dobrowolnie, wierzyciel ma prawo te pieniądze przyjąć. Ale <strong>nie może Cię już do niczego zmusić</strong>.</p>

<h2>Ile lat trwa przedawnienie? — pełna tabela</h2>

<table>
  <thead>
    <tr><th>Rodzaj długu</th><th>Termin</th></tr>
  </thead>
  <tbody>
    <tr><td>Chwilówka / pożyczka pozabankowa</td><td><strong>3 lata</strong></td></tr>
    <tr><td>Kredyt konsumencki (bank)</td><td><strong>3 lata</strong></td></tr>
    <tr><td>Rachunek za telefon, internet, media</td><td><strong>3 lata</strong></td></tr>
    <tr><td>Niezapłacony czynsz mieszkaniowy</td><td><strong>3 lata</strong></td></tr>
    <tr><td>Mandat za jazdę bez biletu</td><td><strong>1 rok</strong></td></tr>
    <tr><td>Zaległości podatkowe, ZUS</td><td><strong>5 lat</strong></td></tr>
    <tr><td>Kredyt hipoteczny</td><td><strong>6 lat</strong></td></tr>
    <tr><td>Dług potwierdzony wyrokiem sądu</td><td><strong>6 lat</strong></td></tr>
  </tbody>
</table>

<h2>Reforma z 2018 r. — termin kończy się 31 grudnia</h2>

<p>Od 9 lipca 2018 roku obowiązuje ważna zasada: <strong>koniec terminu przedawnienia przypada zawsze na 31 grudnia</strong> danego roku (dla terminów co najmniej 2-letnich).</p>

<p><strong>Przykład:</strong> Twoja rata kredytu była wymagalna 10 maja 2020 r. Termin 3-letni minąłby normalnie 10 maja 2023 r. — ale dzięki nowej zasadzie przedłuża się do <strong>31 grudnia 2023 r.</strong></p>

<h2>🚨 Pułapka, która niszczy 9 na 10 dłużników</h2>

<p>Bieg przedawnienia można <strong>przerwać</strong>. A windykatorzy są mistrzami w prowokowaniu tego. Co przerywa przedawnienie?</p>

<ul>
  <li><strong>Każda wpłata</strong> — nawet 10 zł. Po wpłacie termin biegnie od nowa.</li>
  <li><strong>Pisemna prośba o przedłużenie terminu</strong></li>
  <li><strong>Podpisanie ugody, harmonogramu spłaty</strong></li>
  <li><strong>Ustne uznanie długu</strong> (potwierdzone np. nagraniem rozmowy)</li>
  <li><strong>Złożenie pozwu przez wierzyciela</strong></li>
  <li><strong>Wszczęcie egzekucji komorniczej</strong></li>
</ul>

<p>Dlatego windykatorzy dzwoniący w sprawie starych długów <strong>nie proszą o pełną spłatę</strong>. Proszą o symboliczne 50 zł, "żeby pokazać dobrą wolę". Kiedy zapłacisz — przedawnienie się resetuje i 3 lata zaczynają biec od nowa.</p>

<div class="callout callout-warning">
<strong>Praktyczna zasada:</strong> Jeśli Twój dług ma 3+ lat i nie wiesz na pewno czy jest przedawniony — <strong>nie wpłacaj nic</strong>, nie podpisuj nic, nie obiecuj nic. Skonsultuj się z bezpłatną kliniką prawną zanim podejmiesz jakąkolwiek decyzję.
</div>

<h2>Co zrobić jeśli dług jest przedawniony?</h2>

<ol>
  <li><strong>Sprawdź w kalkulatorze</strong> — orientacyjnie ustal czy termin minął.</li>
  <li><strong>Nic nie płać</strong> — nawet jeśli windykator dzwoni i straszy.</li>
  <li><strong>Czekaj na pozew</strong> — jeśli wierzyciel pozwie Cię do sądu, masz prawo podnieść zarzut przedawnienia.</li>
  <li><strong>Sąd MUSI uwzględnić zarzut</strong> — od 2018 r. sąd bada przedawnienie z urzędu w sprawach konsumenckich.</li>
</ol>

<h2>Co zrobić jeśli dostałeś nakaz z e-Sądu (EPU)?</h2>

<p>Masz <strong>dokładnie 14 dni</strong> na złożenie sprzeciwu. W sprzeciwie napisz że podnosisz zarzut przedawnienia. To bezpłatne i automatycznie unieważnia nakaz.</p>

<p><a href="/epu" class="btn">Zobacz instrukcję krok po kroku →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

const a2: Article = {
  slug: "windykator-vs-komornik-roznica",
  title: "Windykator a komornik — fundamentalna różnica, której nie znasz",
  description:
    "Windykator nie ma żadnych uprawnień. Nie może wejść do mieszkania, zająć telewizora, zaglądać na konto. Komornik — może. Tu jest cała różnica.",
  category: "Prawa dłużnika",
  date: "2026-05-08",
  readMinutes: 5,
  emoji: "⚖️",
  excerpt:
    "90% strachu przed windykacją bierze się z nieznajomości jednej prostej różnicy. Windykator to zwykły pracownik prywatnej firmy — może mniej niż listonosz.",
  keywords: ["windykator a komornik", "uprawnienia windykatora", "co może windykator", "windykator wejście do mieszkania"],
  content: `
<p class="lead">Windykatorzy celowo zacierają tę granicę. Im więcej dłużnik myśli że "windykator" i "komornik" to to samo — tym łatwiej go zastraszyć. Tu jest pełna prawda.</p>

<h2>Windykator — kim naprawdę jest</h2>

<p>Windykator to <strong>zwykły pracownik prywatnej firmy</strong>. Wynajęty przez wierzyciela (bank, fundusz, firmę pożyczkową), żeby próbować odzyskać dług. Ma <strong>dokładnie tyle samo uprawnień co listonosz lub akwizytor</strong>.</p>

<h3>Czego windykator NIE może:</h3>
<ul>
  <li>❌ Wejść do mieszkania, domu, na posesję — bez Twojej dobrowolnej zgody</li>
  <li>❌ Zająć telewizora, samochodu, mebli ani żadnego innego mienia</li>
  <li>❌ Zaglądać na konto bankowe</li>
  <li>❌ Wysłać do pracodawcy pisma o zajęciu pensji</li>
  <li>❌ Informować rodziny, sąsiadów, pracodawcy o Twoim długu (to przestępstwo!)</li>
  <li>❌ Przyjść z policją (policja nie pomaga prywatnym firmom w windykacji)</li>
  <li>❌ Zabrać Cię na komisariat</li>
</ul>

<h3>Co windykator MOŻE:</h3>
<ul>
  <li>✅ Dzwonić — ale nie nadmiernie (uporczywe nękanie to przestępstwo z art. 190a KK)</li>
  <li>✅ Wysyłać listy</li>
  <li>✅ Zaproponować ugodę (której nie musisz przyjąć)</li>
  <li>✅ Skierować sprawę do sądu</li>
</ul>

<h2>Komornik — to coś zupełnie innego</h2>

<p>Komornik sądowy to <strong>funkcjonariusz publiczny</strong>. Ma uprawnienia państwa. Działa wyłącznie na podstawie <strong>tytułu wykonawczego</strong> — czyli prawomocnego wyroku sądowego z klauzulą wykonalności.</p>

<h3>Co komornik MOŻE:</h3>
<ul>
  <li>✅ Zająć konto bankowe</li>
  <li>✅ Zająć część wynagrodzenia (z zachowaniem kwoty wolnej)</li>
  <li>✅ Zająć i zlicytować ruchomości (telewizor, samochód)</li>
  <li>✅ Zająć i zlicytować nieruchomość</li>
  <li>✅ Wejść do mieszkania — ale tylko w obecności świadków, z uprzedzeniem, w godzinach 7–21</li>
</ul>

<h3>Czego komornik NIE może:</h3>
<ul>
  <li>❌ Zająć kwoty minimalnego wynagrodzenia (chronione)</li>
  <li>❌ Zająć świadczeń 500+, alimentów, zasiłków rodzinnych</li>
  <li>❌ Wejść do mieszkania bez świadków lub w nocy</li>
  <li>❌ Zabrać przedmiotów codziennego użytku (lodówka, podstawowe meble)</li>
</ul>

<h2>Jak rozpoznać czy masz do czynienia z komornikiem?</h2>

<p><strong>Komornik wysyła pismo z:</strong></p>
<ul>
  <li>oficjalnym nagłówkiem urzędowym</li>
  <li>numerem sprawy "Km" (np. Km 123/24)</li>
  <li>powołaniem się na konkretny tytuł wykonawczy (wyrok sądu)</li>
  <li>pieczęcią urzędową</li>
</ul>

<p><strong>Jeśli pismo zaczyna się od "Drogi Panie..." lub "Wezwanie do zapłaty" bez sygnatury Km — to NIE jest komornik.</strong> To windykator próbujący wzbudzić strach.</p>

<h2>Najczęstszy blef: "Przyjadę z policją"</h2>

<p>Zwroty typu "jutro o 17:00 przyjedzie windykator terenowy z asystą policji w celu zabezpieczenia mienia" są <strong>całkowicie kłamliwe</strong>:</p>

<ol>
  <li>Policja nie asystuje prywatnym firmom w windykacji</li>
  <li>Windykator nie może zabezpieczyć żadnego mienia</li>
  <li>Firmy zatrudniające 2–20 osób fizycznie nie mają pracowników w całej Polsce</li>
</ol>

<p>To masowy spam, wysyłany automatycznie do tysięcy ludzi jednocześnie. Statystyki pokazują, że taka wizyta praktycznie nigdy się nie odbywa.</p>

<div class="callout">
<strong>Co zrobić jeśli ktoś pojawi się pod drzwiami i twierdzi że jest windykatorem?</strong>
<ol>
  <li>Nie otwieraj drzwi.</li>
  <li>Powiedz przez drzwi: "Proszę opuścić teren mojej posesji. Nie wpuszczę Pana bez nakazu sądowego."</li>
  <li>Jeśli nie odejdzie — zadzwoń na 112. Naruszenie miru domowego (art. 193 KK) to przestępstwo zagrożone karą do roku więzienia.</li>
</ol>
</div>

<p><a href="/skrypt-rozmowy" class="btn">Zobacz gotowy skrypt rozmowy →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

const a3: Article = {
  slug: "mikro-firmy-windykacyjne-blef",
  title: "Mikro-firmy windykacyjne — masowy blef o wizycie terenowej",
  description:
    "3-osobowa firma windykacyjna nie wyśle do Ciebie pracownika terenowego. Wyjaśniamy matematykę: dlaczego SMS o jutrzejszej wizycie jest automatycznym spamem.",
  category: "Windykacja",
  date: "2026-05-06",
  readMinutes: 4,
  emoji: "🎭",
  excerpt:
    "Firmy zatrudniające 2-12 osób wysyłają tysiące SMS-ów dziennie. Wizyta nigdy się nie odbywa — ale tysiące osób przelewają pieniądze ze strachu.",
  keywords: ["windykator terenowy", "wizyta windykatora", "blef windykacyjny", "SMS od windykatora"],
  content: `
<p class="lead">Dostałeś SMS-a: "Jutro o 17:00 zaplanowana wizyta windykatora terenowego w celu zabezpieczenia mienia ruchomego. Aby uniknąć — proszę o kontakt..." Brzmi przerażająco? Spokojnie. To czysta matematyka mówi: to blef.</p>

<h2>Matematyka windykacji terenowej</h2>

<p>Z raportów rynkowych wiemy dokładnie ile kosztuje utrzymanie jednego windykatora terenowego:</p>

<ul>
  <li>Wynagrodzenie: <strong>~7 000 zł/miesiąc</strong></li>
  <li>Leasing auta + paliwo: <strong>~6 000 zł/miesiąc</strong></li>
  <li><strong>Łącznie: ~13 000 zł na 1 pracownika terenowego</strong></li>
</ul>

<p>Żeby pokryć ten koszt, windykator musi miesięcznie odzyskać dużo pieniędzy. Dlatego windykacja terenowa <strong>jest opłacalna wyłącznie przy długach powyżej kilkudziesięciu tysięcy złotych</strong>.</p>

<h2>Kto naprawdę wysyła ludzi w teren?</h2>

<p>Tylko największe firmy:</p>
<ul>
  <li>KRUK SA (3 414 pracowników)</li>
  <li>BEST SA (608)</li>
  <li>EOS Poland (503)</li>
  <li>Intrum (397)</li>
</ul>

<p>I robią to <strong>tylko przy długach powyżej 20–30 tysięcy złotych</strong>. Przy mniejszych długach jest to po prostu nieopłacalne.</p>

<h2>Kto wysyła straszące SMS-y?</h2>

<p>SMS-y typu "jutro o 17:00..." wysyłają najczęściej mikro-firmy zatrudniające 2–20 osób:</p>

<ul>
  <li>TAXAT (12 pracowników)</li>
  <li>Vindicat (11)</li>
  <li>Unicollect (3)</li>
  <li>Opus Collection (2)</li>
</ul>

<p>Firma zatrudniająca <strong>3 osoby</strong> obsługuje tysiące dłużników. Nikt z tej firmy fizycznie nie pojedzie z Warszawy do Bielska-Białej żeby zabezpieczyć telewizor. To <strong>zautomatyzowany spam SMS</strong> wysyłany do tysięcy osób jednocześnie. Skuteczność opiera się wyłącznie na strachu.</p>

<h2>Jak rozpoznać blef?</h2>

<p>To prawie zawsze blef, jeśli:</p>

<ul>
  <li>📱 Otrzymujesz SMS z zapowiedzią konkretnej daty i godziny wizyty</li>
  <li>📱 SMS zawiera słowa "policja", "zabezpieczenie mienia", "ostatnie ostrzeżenie"</li>
  <li>📱 Twój dług jest mniejszy niż 20 000 zł</li>
  <li>📱 Nie ma jeszcze wyroku sądowego (komornik nie został wyznaczony)</li>
</ul>

<p><strong>Dlaczego to blef:</strong></p>
<ol>
  <li>Prawdziwy windykator terenowy <em>nie zapowiada wizyty</em> — element zaskoczenia jest kluczowy (skuteczność spada poniżej 5% przy zapowiedzianej wizycie).</li>
  <li>Windykator nie ma uprawnień do zabezpieczenia mienia. Może to tylko komornik.</li>
  <li>Policja nie asystuje prywatnym firmom w windykacji.</li>
</ol>

<h2>Co zrobić gdy dostaniesz taki SMS?</h2>

<ol>
  <li><strong>Nie reaguj emocjonalnie.</strong> Tego właśnie chcą.</li>
  <li><strong>Nie oddzwaniaj na numer z SMS-a.</strong> Każda rozmowa to dla nich szansa zmanipulować Cię.</li>
  <li><strong>Zachowaj SMS.</strong> Zrób zrzut ekranu z datą i godziną.</li>
  <li><strong>Zignoruj zapowiadaną wizytę.</strong> 99% przypadków — nikt się nie pojawi.</li>
  <li><strong>Wyślij pismo RODO</strong> cofające zgody na kontakt telefoniczny i SMS.</li>
</ol>

<p>Jeśli ktoś rzeczywiście przyjdzie — masz prawo nie otworzyć drzwi. Nikt prywatny nie ma prawa wejść do Twojego domu.</p>

<p><a href="/generator-pism" class="btn">Wygeneruj pismo RODO →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

const a4: Article = {
  slug: "cesja-dlugu-prezent-dla-dluznika",
  title: "Sprzedali Twój dług? To często prezent dla Ciebie",
  description:
    "Cesja długu na fundusz sekurytyzacyjny brzmi groźnie, ale w 70% przypadków oznacza ogromną szansę na całkowite uwolnienie się od zobowiązania.",
  category: "Zaawansowane",
  date: "2026-05-04",
  readMinutes: 6,
  emoji: "🎁",
  excerpt:
    "Gdy bank sprzedaje Twój dług do funduszu sekurytyzacyjnego — często traci się dokumentacja źródłowa. W sądzie to fundusz musi udowodnić istnienie długu. Często nie ma jak.",
  keywords: ["cesja długu", "fundusz sekurytyzacyjny", "sprzedaż wierzytelności", "BEST KRUK pozew"],
  content: `
<p class="lead">Dostałeś pismo: "Państwa zadłużenie z tytułu umowy nr X zostało nabyte przez fundusz sekurytyzacyjny Y." Większość ludzi wpada w panikę. To błąd. Cesja długu — z perspektywy strategii obrony — to często najlepsza wiadomość jaką mogłeś otrzymać.</p>

<h2>Czym jest cesja długu?</h2>

<p>Cesja to sprzedaż wierzytelności (czyli Twojego długu) od pierwotnego wierzyciela (np. banku) do innego podmiotu — najczęściej <strong>funduszu sekurytyzacyjnego</strong> lub niestandaryzowanego funduszu inwestycyjnego zamkniętego (NFIZ).</p>

<h2>Dlaczego banki sprzedają długi?</h2>

<p>Bo to dla nich tańsze niż samodzielna windykacja. Bank sprzedaje "trudny" dług funduszowi <strong>za ułamek wartości</strong> — typowo 10-20% pierwotnej kwoty. Fundusz kupuje 1000 takich długów hurtowo, próbuje wycisnąć z nich co się da, a co się nie uda — odsprzedaje dalej lub pisze w straty.</p>

<h2>Dlaczego cesja to często prezent dla dłużnika?</h2>

<h3>1. Brak dokumentacji</h3>

<p>Pakiety długów sprzedawane są w arkuszach Excela. Bardzo często fundusz <strong>nie dostaje oryginalnej umowy</strong>, dowodów wypłaty środków, pełnej historii spłat. Ma tylko: imię, nazwisko, PESEL, kwotę.</p>

<h3>2. Ciężar dowodu</h3>

<p>W polskim procesie cywilnym to <strong>powód musi udowodnić swoje roszczenie</strong> (art. 6 KC). Jeśli fundusz pozwie Cię do sądu, MUSI przedstawić:</p>

<ul>
  <li>Oryginał lub poświadczoną kopię umowy</li>
  <li>Dowód wypłaty środków na Twoje konto</li>
  <li>Pełną historię spłat (jeśli były)</li>
  <li>Wyliczenie wysokości długu</li>
  <li>Dowód skutecznej cesji (umowa cesji)</li>
</ul>

<p>Bardzo często fundusz <strong>nie ma jak tego przedstawić</strong>. Po wpłynięciu sprzeciwu i podniesieniu zarzutów — sąd oddala powództwo w całości.</p>

<h3>3. Cesja nie przerywa przedawnienia</h3>

<p>Sprzedaż długu <strong>nie przerywa biegu przedawnienia</strong>. Nowy właściciel (fundusz) wchodzi w prawa starego z całym dotychczasowym terminem. Jeśli Twój dług miał już 2 lata gdy fundusz go kupił — został mu jeszcze tylko rok do przedawnienia.</p>

<h2>Co zrobić gdy dostaniesz informację o cesji?</h2>

<ol>
  <li><strong>Nie panikuj.</strong> To często dobra wiadomość.</li>
  <li><strong>Nie kontaktuj się z funduszem.</strong> Każda rozmowa to ryzyko uznania długu.</li>
  <li><strong>Nie płać nic.</strong> Wpłata przerywa przedawnienie.</li>
  <li><strong>Sprawdź przedawnienie</strong> w kalkulatorze.</li>
  <li><strong>Wyślij pismo RODO</strong> żeby zatrzymać telefony i SMS-y.</li>
  <li><strong>Czekaj.</strong> Jeśli fundusz pozwie Cię — wtedy działasz w sądzie.</li>
</ol>

<h2>Co zrobić jeśli fundusz Cię pozwie?</h2>

<p>Jeśli dostałeś nakaz zapłaty z e-Sądu w Lublinie (EPU), masz <strong>14 dni</strong> na sprzeciw. Sprzeciw jest bezpłatny. W sprzeciwie powołaj się na:</p>

<ul>
  <li>Zaprzeczenie istnienia długu i jego wysokości</li>
  <li>Brak legitymacji procesowej powoda (nie udowodnił że nabył wierzytelność)</li>
  <li>Zarzut przedawnienia (jeśli dotyczy)</li>
  <li>Wezwanie do przedłożenia całej dokumentacji źródłowej</li>
</ul>

<p>Po sprzeciwie sprawa idzie do normalnego sądu. Fundusz musi tam udowodnić wszystko. <strong>Wiele funduszy w tym momencie rezygnuje</strong> z dalszego procesu — bo koszty są zbyt wysokie w stosunku do szans wygranej.</p>

<div class="callout">
<strong>Najwięksi gracze rynku cesji długów w Polsce:</strong>
<ul>
  <li>KRUK SA — największa firma na rynku</li>
  <li>BEST SA — fundusze NFIZ</li>
  <li>HOIST Polska</li>
  <li>Link Financial — specjalizuje się w pozwach masowych</li>
  <li>B2 Impact (Ultimo)</li>
</ul>
</div>

<p><a href="/epu" class="btn">Dostałeś pozew? Zobacz instrukcję →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

const a5: Article = {
  slug: "sprzeciw-epu-14-dni-instrukcja",
  title: "Sprzeciw od nakazu zapłaty EPU — instrukcja krok po kroku",
  description:
    "List z sądu w Lublinie? Masz 14 dni na bezpłatny sprzeciw. Składanie sprzeciwu unieważnia nakaz i zmusza wierzyciela do udowodnienia długu w normalnym sądzie.",
  category: "Pilne",
  date: "2026-05-12",
  readMinutes: 5,
  emoji: "⚠️",
  urgent: true,
  excerpt:
    "Brak reakcji w 14 dni = komornik. Reakcja = sprawa wraca do normalnego sądu i fundusz musi udowodnić dług dokumentami. Często nie ma jak.",
  keywords: ["sprzeciw od nakazu zapłaty", "EPU 14 dni", "e-Sąd Lublin", "Nc-e nakaz"],
  content: `
<p class="lead">Każdego dnia e-Sąd w Lublinie wydaje tysiące nakazów zapłaty. Sąd nie bada dowodów — opiera się tylko na twierdzeniach powoda. To dlatego sprawa może wyglądać dla Ciebie beznadziejnie. Ale prawo daje Ci <strong>14 dni</strong>, w czasie których możesz w prosty sposób unieważnić cały nakaz.</p>

<h2>Czym jest EPU?</h2>

<p>EPU = <strong>Elektroniczne Postępowanie Upominawcze</strong>. Jest to specjalny tryb cywilny, w którym wierzyciele mogą hurtowo dochodzić roszczeń przez internet. Sprawami zajmuje się wyłącznie <strong>Sąd Rejonowy Lublin-Zachód, VI Wydział Cywilny</strong>.</p>

<h2>Jak wygląda nakaz EPU?</h2>

<p>To list polecony z Lublina, zawierający:</p>
<ul>
  <li>Pieczęć "Sąd Rejonowy Lublin-Zachód w Lublinie"</li>
  <li>Sygnaturę "Nc-e" + numer/rok (np. Nc-e 12345/24)</li>
  <li>Informację o nakazie zapłaty</li>
  <li>Pouczenie o 14-dniowym terminie na sprzeciw</li>
</ul>

<h2>Jak liczyć 14 dni?</h2>

<p>Termin biegnie od daty <strong>doręczenia</strong> nakazu, nie od daty jego wydania:</p>

<ul>
  <li>Odebrałeś osobiście → termin biegnie od tego dnia</li>
  <li>Awizowany list odebrany w późniejszej dacie → termin od daty odbioru</li>
  <li>Dwukrotnie awizowany i nie odebrany → termin liczy się od daty pierwszego awiza + 14 dni (tzw. fikcja doręczenia)</li>
</ul>

<div class="callout callout-warning">
<strong>Kluczowe:</strong> Schowanie listu do szuflady NIE zatrzymuje terminu. Termin biegnie nawet jeśli nie otworzyłeś koperty.
</div>

<h2>Co się stanie jeśli nie zareagujesz w 14 dni?</h2>

<p>Nakaz <strong>uprawomocni się automatycznie</strong>. Sąd nada mu klauzulę wykonalności. Wierzyciel zaniesie to do komornika. Komornik nie bada zasadności nakazu — egzekwuje. <strong>Twoje konto, pensja, ruchomości — wszystko jest zagrożone.</strong></p>

<p>Najgorsze: tracisz prawo do kwestionowania długu. Nawet jeśli dług był przedawniony, oparty o klauzule abuzywne, lub w ogóle nie istniał — nie możesz już tego podnieść.</p>

<h2>Co się stanie jeśli złożysz sprzeciw w terminie?</h2>

<p>To prawie magia. Wystarczy złożyć sprzeciw, a nakaz <strong>automatycznie traci moc</strong>. Sprawa zostaje przeniesiona do normalnego sądu rejonowego (właściwego dla Twojego miejsca zamieszkania).</p>

<p>W normalnym sądzie:</p>
<ul>
  <li>Powód musi udowodnić istnienie długu</li>
  <li>Musi przedstawić oryginalną umowę, dowody wypłaty środków</li>
  <li>Musi udowodnić cesję (jeśli kupił dług od kogoś)</li>
  <li>Ty masz prawo do obrony, składania dowodów, zgłaszania zarzutów</li>
</ul>

<h2>Sprzeciw jest bezpłatny i prosty</h2>

<p>To kluczowa informacja, której wielu nie zna. <strong>Sprzeciw nie wymaga żadnych opłat sądowych</strong>. Nie musisz być prawnikiem. Wystarczy proste pismo zawierające:</p>

<ol>
  <li>Twoje dane i sygnaturę akt</li>
  <li>Oświadczenie: "Zaskarżam nakaz zapłaty w całości"</li>
  <li>Wniosek o oddalenie powództwa</li>
  <li>Krótkie uzasadnienie (np. "Kwestionuję powództwo co do zasady i wysokości")</li>
  <li>Twój własnoręczny podpis</li>
</ol>

<h2>Co napisać w uzasadnieniu?</h2>

<p>Im więcej zarzutów — tym lepiej dla Ciebie. Najmocniejsze:</p>

<ul>
  <li><strong>Zarzut przedawnienia</strong> — jeśli dług jest stary (3+ lata)</li>
  <li><strong>Brak legitymacji powoda</strong> — jeśli powodem jest fundusz a nie pierwotny wierzyciel</li>
  <li><strong>Kwestionowanie wysokości</strong> — fundusze często doliczają fikcyjne odsetki i opłaty</li>
  <li><strong>Wezwanie do przedstawienia dokumentów</strong> — umowy, dowodów wypłaty, historii spłat</li>
</ul>

<h2>Jak wysłać sprzeciw?</h2>

<p>Wyłącznie <strong>listem poleconym za potwierdzeniem odbioru</strong>. Liczy się data nadania. Zachowaj potwierdzenie nadania — to Twój jedyny dowód dotrzymania terminu.</p>

<p>Koszt: ok. 8-12 zł.</p>

<p>Adres: Sąd Rejonowy Lublin-Zachód w Lublinie, VI Wydział Cywilny, ul. Boczna Lubomelskiej 13, 20-070 Lublin.</p>

<div class="callout">
<strong>Mamy gotowy generator sprzeciwu</strong> — uzupełnij formularz w 2 minuty, wydrukuj, podpisz, wyślij.
</div>

<p><a href="/generator-pism" class="btn">Generuj sprzeciw EPU →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

const a6: Article = {
  slug: "upadlosc-konsumencka-2026",
  title: "Upadłość konsumencka 2026 — 30 zł i nowy start",
  description:
    "W 2025 r. ogłoszono 21 366 upadłości konsumenckich. Opłata sądowa to tylko 30 zł. Nie potrzebujesz majątku. Sprawdź czy to wyjście dla Ciebie.",
  category: "Restrukturyzacja",
  date: "2026-04-30",
  readMinutes: 7,
  emoji: "🔄",
  excerpt:
    "Gdy długów jest za dużo i obrona procesowa nie wchodzi w grę — upadłość konsumencka jest legalnym, tanim i coraz częściej wybieranym rozwiązaniem.",
  keywords: ["upadłość konsumencka", "bankructwo osobiste", "umorzenie długów", "syndyk"],
  content: `
<p class="lead">Słowo "upadłość" brzmi przerażająco. Jakby był to koniec świata. W rzeczywistości — to przewidziany prawem mechanizm, który umożliwia <strong>całkowite umorzenie długów</strong>. W 2025 roku skorzystało z niego 21 366 osób. Trzeci rok z rzędu rekord.</p>

<h2>Kiedy upadłość ma sens?</h2>

<p>Upadłość konsumencka jest dla osób, dla których:</p>

<ul>
  <li>Długi obiektywnie przekraczają możliwości spłaty w dającej się przewidzieć przyszłości</li>
  <li>Obrona procesowa nie wchodzi w grę (długi z prawomocnymi wyrokami)</li>
  <li>Komornicy już prowadzą egzekucję</li>
  <li>Stres i presja niszczą zdrowie i relacje rodzinne</li>
</ul>

<p>Nie musisz mieć "wielkich" długów. Nawet 30-50 tys. zł, jeśli obiektywnie nie jesteś w stanie spłacać, jest podstawą do upadłości.</p>

<h2>Ile to kosztuje?</h2>

<p>Tu jest miła niespodzianka:</p>

<ul>
  <li>Opłata sądowa od wniosku: <strong>30 zł</strong></li>
  <li>Opłata skarbowa od pełnomocnictwa (jeśli korzystasz z prawnika): <strong>17 zł</strong></li>
  <li>Wynagrodzenie syndyka: <strong>pokrywane z masy upadłości lub przez Skarb Państwa</strong></li>
</ul>

<p>Czyli wszystko zaczyna się od <strong>30 zł</strong>. Jeśli nie masz majątku do likwidacji — koszty syndyka pokrywa państwo.</p>

<h2>Nie musisz mieć majątku!</h2>

<p>To powszechny mit. Wielu ludzi nie składa wniosku bo myślą "nie mam co stracić". Tymczasem <strong>brak majątku często upraszcza i przyspiesza procedurę</strong>. Syndyk nie ma czego likwidować — od razu przechodzi do planu spłaty.</p>

<h2>Jak wygląda proces?</h2>

<ol>
  <li><strong>Składasz wniosek</strong> do sądu gospodarczego — opisujesz długi, majątek, źródła dochodu, przyczyny niewypłacalności.</li>
  <li><strong>Sąd ogłasza upadłość</strong> (coraz częściej na posiedzeniu niejawnym — bez wzywania Cię na salę).</li>
  <li><strong>Wyznaczony zostaje syndyk</strong> — sprawuje nadzór nad procesem.</li>
  <li><strong>Likwidacja majątku</strong> (jeśli masz coś do zlicytowania).</li>
  <li><strong>Plan spłaty</strong> — sąd ustala miesięczne wpłaty na okres 3 lat (36 miesięcy).</li>
  <li><strong>Umorzenie pozostałych długów</strong> po zakończeniu planu spłaty.</li>
</ol>

<h2>Trzy możliwe wyniki upadłości</h2>

<h3>1. Plan spłaty (najczęstszy)</h3>
<p>Sąd ustala miesięczne wpłaty — często symboliczne, dopasowane do Twoich możliwości. Trwa do 36 miesięcy. Po zakończeniu — reszta długu zostaje umorzona.</p>

<h3>2. Pełne umorzenie bez planu spłaty</h3>
<p>Stosowane w przypadkach trwałej niezdolności do pracy (choroba, kalectwo, podeszły wiek). Długi znikają od razu.</p>

<h3>3. Warunkowe umorzenie</h3>
<p>5-letni okres próby. Jeśli Twoja sytuacja się polepszy, możesz zostać zobowiązany do dodatkowych wpłat.</p>

<h2>Kiedy upadłość się NIE uda?</h2>

<p>Sąd odmówi ogłoszenia upadłości, jeśli ustali że:</p>

<ul>
  <li>Celowo ukryłeś majątek (np. fikcyjna darowizna nieruchomości na rodzinę)</li>
  <li>Podałeś nieprawdziwe informacje we wniosku</li>
  <li>Świadomie zaciągałeś pożyczki planując bankructwo</li>
</ul>

<p>To są jedyne realne przeszkody. Jeśli Twoja sytuacja jest uczciwa — sąd ogłosi upadłość.</p>

<h2>Co zostaje po upadłości?</h2>

<ul>
  <li>✅ <strong>Czysta karta</strong> — długi (te zgłoszone) zostają umorzone</li>
  <li>✅ Możesz dalej pracować, mieć konto, kupować na faktury</li>
  <li>⚠️ Przez 10 lat masz wpis w Krajowym Rejestrze Zadłużonych</li>
  <li>⚠️ Mogą być utrudnienia z dostaniem kredytu w bankach</li>
</ul>

<p>Ale — z perspektywy osoby w spirali zadłużenia — to <strong>oddech</strong>. Możliwość zaczęcia od nowa.</p>

<h2>Gdzie szukać pomocy?</h2>

<p>Wniosek o upadłość jest skomplikowany. Najlepiej skonsultować z prawnikiem. Pomoc bezpłatna:</p>

<ul>
  <li><strong>Nieodpłatna Pomoc Prawna (NPP)</strong> — w każdym powiecie, umów telefonicznie</li>
  <li><strong>Fundacja Togatus Pro Bono</strong> — ogólnopolska, specjalizuje się w sprawach trudnych</li>
  <li><strong>Kliniki Prawne</strong> — przy wydziałach prawa większych uczelni (UW, UJ, UAM)</li>
</ul>

<p><a href="/#kontakt" class="btn">Lista bezpłatnych klinik prawnych →</a></p>
`,
};

// ────────────────────────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [a5, a1, a2, a3, a4, a6]; // ordered by importance/urgency

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
