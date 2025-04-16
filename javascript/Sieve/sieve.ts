export class Sieve {
  /**
   * Returns the Nth prime number.
   *
   * @param n - The Nth prime to find.
   * @returns The Nth prime.
   * @throws error if n is not a whole number (0, 1, 2, etc).
   *
   */

  nthPrime(n: number): number {
    this.validateInput(n);
    let multiplier = 2;
    let sieveSize = n * multiplier;
    let primes = [2];
    while (primes.length < n) {
      primes = this.createPrimeArray(sieveSize);
      multiplier += 1;
      sieveSize = n * multiplier;
    }
    return primes[n];
  }

  /**
   * Validates that the input is a whole number (0, 1, 2, etc.)
   *
   * @param n - The input to validate.
   * @throws error if n is not a whole number.
   *
   */
  private validateInput(n: number) {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error(`Invalid input: ${n} is not a whole number.`);
    }
  }

  /**
   * Creates a sequentially ordered array of prime numbers.
   *
   * @remarks
   * Uses the Sieve of Eratosthenes algorithm to get primes.
   * The index of the sieve represents its number (ie, index 2 represents the number 2).
   * Primes are represented by `1` at an index in the sieve, and composites are represented by `0`.
   * Therefore, sieve[2] = 1 means that the number 2 is prime.
   * If a prime is found in the sieve, it is added to the array of primes. This ensures primes are ordered sequentially.
   *
   * @param sieveSize - The size of the sieve.
   * @returns An array of ordered prime numbers.
   *
   */
  private createPrimeArray(sieveSize: number): number[] {
    let sieve = new Uint8Array(sieveSize).fill(1);
    const primes = new Array();
    for (let i = 2; i < sieveSize; i++) {
      if (sieve[i] == 1) {
        primes.push(i);
        sieve = this.markMultiples(sieveSize, i, sieve);
      }
    }
    return primes;
  }

  /**
   * Marks multiples of the current prime number in the sieve.
   *
   * @remarks The current prime is multiplied by itself to find the first multiple,
   * which is then marked as composite (0) in the sieve.
   *
   * This process continues until the multiple is out of range of the sieve.
   *
   * @param sieveSize - The size of the sieve.
   * @param currentPrime - The current prime.
   * @param sieve - The sieve to edit.
   * @returns The updated sieve.
   *
   */
  private markMultiples(
    sieveSize: number,
    currentPrime: number,
    sieve: Uint8Array
  ): Uint8Array {
    for (let j = currentPrime; j < sieveSize; j++) {
      const currentMultiple = j * currentPrime;
      if (currentMultiple < sieveSize) {
        sieve[currentMultiple] = 0;
      } else {
        break;
      }
    }
    return sieve;
  }
}
