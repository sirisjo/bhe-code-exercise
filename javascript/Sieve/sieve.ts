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
    let multiplicationFactor = 2;
    let seiveSize = n * multiplicationFactor;
    let primes = [2];
    while (primes.length < n) {
      primes = this.createPrimeArray(seiveSize);
      multiplicationFactor += 1;
      seiveSize = n * multiplicationFactor;
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
   * Creates a sequantially ordered array of prime numbers.
   *
   * @remarks
   * Uses the Sieve of Eratosthenes algorithm to get primes.
   * The index of the sieve represents its number (ie, index 2 represents the number 2).
   * Primes are represented by `1` at an index in the seive, and composites are represented by `0`.
   * Therefore, seive[2] = 1 means that the number 2 is prime.
   * If a prime is found in the seive, it is added to the array of primes. This ensures primes are ordered sequentially.
   *
   * @param seiveSize - The size of the seive.
   * @returns An array of ordered prime numbers.
   *
   */
  private createPrimeArray(seiveSize: number): number[] {
    let seive = new Uint8Array(seiveSize).fill(1);
    const primes = new Array();
    for (let i = 2; i < seiveSize; i++) {
      if (seive[i] == 1) {
        primes.push(i);
        seive = this.markMultiplicatives(seiveSize, i, seive);
      }
    }
    return primes;
  }

  /**
   * Marks multiplicatives of the current prime number in the seive.
   *
   * @remarks The current prime is multiplied by itself to find the first multiple,
   * which is then marked as composite (0) in the seive.
   *
   * This process continues until the multiple is out of range of the seive.
   *
   * @param seiveSize - The size of the seive.
   * @param currentPrime - The current prime.
   * @param seive - The seive to edit.
   * @returns The updated seive.
   *
   */
  private markMultiplicatives(
    seiveSize: number,
    currentPrime: number,
    seive: Uint8Array
  ): Uint8Array {
    for (let j = currentPrime; j < seiveSize; j++) {
      const currentMultiple = j * currentPrime;
      if (currentMultiple < seiveSize) {
        seive[currentMultiple] = 0;
      } else {
        break;
      }
    }
    return seive;
  }
}
