import { Sieve } from "./sieve";

describe("Sieve", () => {
  test("valid results", () => {
    const sieve = new Sieve();
    expect(sieve.nthPrime(0)).toBe(2);
    expect(sieve.nthPrime(19)).toBe(71);
    expect(sieve.nthPrime(99)).toBe(541);
    expect(sieve.nthPrime(500)).toBe(3581);
    expect(sieve.nthPrime(986)).toBe(7793);
    expect(sieve.nthPrime(2000)).toBe(17393);
    expect(sieve.nthPrime(1000000)).toBe(15485867);
    expect(sieve.nthPrime(10000000)).toBe(179424691);
    // expect(sieve.nthPrime(100000000)).toBe(2038074751); not required, just a fun challenge
  });
  test("error cases", () => {
    const sieve = new Sieve();
    expect(() => sieve.nthPrime(-1)).toThrow(
      "Invalid input: -1 is not a whole number."
    );
    expect(() => sieve.nthPrime(1.5)).toThrow(
      "Invalid input: 1.5 is not a whole number."
    );
  });
});
