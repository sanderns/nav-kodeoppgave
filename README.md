# NAV IT - Kodeoppgave

Jeg har fått i oppgave fra NAV IT å skrive en kode som regner ut hvor mye dagpenger en kan få, dersom man er kvalifisert for det.

## Oppgaven var som følger:<br>

> I denne oppgaven skal du finne ut om en bruker kan få dagpenger, og hvor mye. Reglene er basert på de ekte dagpengereglene, men forenklet til å passe til oppgaven.
> Dagpenger er en ytelse man kan få hvis man har mistet jobben eller er permittert. For å være kvalifisert til å få dagpenger, må man ha hatt arbeidsinntekt minst det siste kalenderåret.
>
> Når en bruker søker om dagpenger trenger de å vite om de har rett til dagpenger. Hvis de får det innvilget, trenger de også å vite hvor mye de får per dag, kalt dagsatsen. For å få innvilget dagpenger må man enten ha tjent til sammen over 3G de siste 3 kalenderårene, eller ha tjent over 1.5G forrige kalenderår.
> Grunnbeløpet, kalt G, brukes til å beregne mange av NAVs ytelser. Grunnbeløpet justeres 1. mai hvert år og blir fastsatt etter trygdeoppgjøret.
>
> Hvis man har tjent nok til å få dagpenger, er det et nytt regnestykke for å finne grunnlaget vi trenger for å beregne dagsatsen. Dette dagpengegrunnlaget er også basert på inntekten de siste tre årene. Dagpengegrunnlaget er den høyeste verdien av enten inntekten siste kalenderåret, eller gjennomsnittsinntekten de siste tre kalenderårene. Dagpengegrunnlaget kan ikke være høyere enn 6G.
>
> For å finne dagsatsen deler man dagpengegrunnlaget på antall arbeidsdager i året, rundet opp. I NAV har vi definert antall arbeidsdager i et år til å være 260.
> <br> Oppgaven er:
> <br> - Ta imot tre år med inntekt, og returnere om bruker har rett på dagpenger. Inntekten er én sum per kalenderår.
> <br> - Hvis brukeren har rett på dagpenger skal du også returnere dagsatsen.
> <br> - Bruk enten Java, JavaScript eller Kotlin, det er ingen krav om UI
> <br> - Besvarelsen skal inneholde tester
>
> Eksempel:
> <br> Hvis man har tjent dette:
> <br> 2021: 500000
> <br> 2020: 450000
> <br> 2019: 400000
> <br> så har man rett på dagpenger, og man får en dagsats på kr 1924k

## Litt om tankegangen min under kodingen

Først og fremst valgte jeg å skrive oppgaven i JavaScript med Jest for testing.

Under kodingen fant jeg ut at det er greit å ha disse variablene på plass som typ globale variabler, siden jeg kommer til å bruk for de senere i koden.

```JavaScript
const baseAmount = 111477;
const workDays = 260;
```

Navngivning av funksjonen er jeg enda litt usikker på om passer, men siden man sjekker om brukeren er kvalifisert for dagpenger, så kom jeg frem til dette. Jeg valgte også å ha tre forskjellige parametere i funksjonen siden i oppgaveteksten står det at man skal ta imot tre år med inntekt. Jeg kunne også hatt ett objekt eller ett array som parameter også og descructure'a det for å få tak i de verdiene jeg er ute etter.

```JavaScript
// 'y' for year og '21' for 2021, osv.
const checkEligibility = (y21, y20, y19) => {
    // code
}
```

Variablene ønsket jeg på plass med en gang siden de skal refereres til rett etterpå.

```JavaScript
const totalIncome = y21 + y20 + y19;
const averageIncome = totalIncome / 3;
const highestIncome = Math.max(y21, averageIncome);
```

Enda fler variabler som sjekker om argumentene sendt med funksjonen fyller visse krav som om inntekt siste år er mer enn 1,5G, om gjennomsnittsinntekten siste tre år er mer enn 3G og om den høyeste inntekten mellom siste år og gjennomsnittet fra de tre siste årene er mer enn 6G. Alle blir isåfall lagret som true eller false for forenkling av if statements senere i koden.

```JavaScript
const check15G = y21 > baseAmount * 1.5;
const check3G = totalIncome > baseAmount * 3;
const check6G = highestIncome > baseAmount * 6;
```

Avslutter funksjonen med å sjekke verdiene i variablene satt ovenfor og returnerer passende verdi rundet opp. Jeg benytter meg også av guard clauses istedet for nøstede if statements for å unngå rotete kode.

```JavaScript
if (!check15G && !check3G) {
	return 0;
}

if (check6G) {
    return Math.ceil((baseAmount * 6) / workDays);
}

return Math.ceil(highestIncome / workDays);
```

Her er alle testene jeg har kjørt som alle passerer. Test navnene har forbedringpotensial.

```JavaScript
test('should return 0, since 3G and 1.5G does not pass', () => {
	expect(checkEligibility(120000, 80000, 40000)).toBe(0);
});

test('should return daily allowance, since 3G passes', () => {
	expect(checkEligibility(111500, 111500, 111500)).toBe(429);
});

test('should return daily allowance, since 1.5G passes', () => {
	expect(checkEligibility(170000, 105000, 40000)).toBe(654);
});

test('should return daily allowance, since both 3G and 1.5G passes, but average income exceeds last years income', () => {
	expect(checkEligibility(400000, 450000, 500000)).toBe(1731);
});

test('should return daily allowance, since both 3G and 1.5G passes, but last years income exceeds average income', () => {
	expect(checkEligibility(500000, 450000, 400000)).toBe(1924);
});

test('should return daily allowance, but last years income exceeds 6G', () => {
	expect(checkEligibility(720000, 480000, 240000)).toBe(2573);
});

test('should return daily allowance, but average income exceeds 6G', () => {
	expect(checkEligibility(700000, 700000, 700000)).toBe(2573);
});
```

Takk for meg og håper dere anser meg som relevant til et videre intervju!
