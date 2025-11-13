import { describe, test, expect } from 'vitest';

// Byggescript feiler hvis det ikke finnes testfiler.
// Det er ikke så aktuelt for dette repoet lenger da
// vi er i ferd med å avvikle BrevbyggerBeta.
// Legger inn en tom test sånn at bygget ikke brekker.
// Denne kan slettes hvis det legges inn reelle tester igjen

describe('dummy-test', () => {
  test('dummy-test', () => {
    expect(true).toBe(true);
  });
});
