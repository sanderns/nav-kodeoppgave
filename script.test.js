const checkEligibility = require('./script');

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