//
//
//  File created 03.10.2022 23:31
//  By Sander Nordhagen Svingen
//  sanderns on Github
//
//
//	Jeg skriver alt i filen på Engelsk, fordi det er en vane
// 	jeg har tilegnet meg. Jeg tilegnet meg vanen her fordi jeg
//	synes at god kode må gjøre seg selv forstått, og det er ikke
//	nødvendigvis at mine fremtidige kolleger eller de som skal
//	vedlikeholde koden kan Norsk like godt.
//
//

const baseAmount = 111477;
const workDays = 260;

const checkEligibility = (y21, y20, y19) => {
	// I could also take in an object or array as the argument,
	// and then desctructure it into three different variables.

	// Variables
	const totalIncome = y21 + y20 + y19;
	const averageIncome = totalIncome / 3;
	const highestIncome = Math.max(y21, averageIncome);

	// Booleans
	const check15G = y21 > baseAmount * 1.5;
	const check3G = totalIncome > baseAmount * 3;
	const check6G = highestIncome > baseAmount * 6;

	// Guard clauses
	if (!check15G && !check3G) {
		return 0;
	}

	if (check6G) {
		return Math.ceil((baseAmount * 6) / workDays);
	}

	return Math.ceil(highestIncome / workDays);
};

module.exports = checkEligibility;
