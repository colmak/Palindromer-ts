import { Trie } from "./trie";

export interface PalindromeResult {
  palindrome: string;
  leftPart: string;
  rightPart: string;
  isComplete: boolean;
  depth: number;
}

export interface SearchOptions {
  algorithm: "brute-force" | "monte-carlo";
  maxDepth: number;
  maxResults: number;
  reverse: boolean;
}

export class Palindromer {
  private trie: Trie;
  private dictionary: string[] = [];

  constructor() {
    this.trie = new Trie();
  }

  /**
   * Load dictionary from array of words
   */
  loadDictionary(words: string[]): void {
    this.dictionary = words
      .map((word) => word.trim().toUpperCase())
      .filter((word) => word.length > 0);
    this.trie.loadDictionary(this.dictionary);
  }

  /**
   * Parse input text with separator
   */
  parseInput(input: string): { left: string; right: string } | null {
    const parts = input.split("|");
    if (parts.length !== 2) {
      return null;
    }

    return {
      left: parts[0].trim().toUpperCase(),
      right: parts[1].trim().toUpperCase(),
    };
  }

  /**
   * Check if a string is a palindrome
   */
  isPalindrome(text: string): boolean {
    const cleaned = text.replace(/\s+/g, "");
    return cleaned === cleaned.split("").reverse().join("");
  }

  /**
   * Generate all possible palindromes from a starting point
   */
  generatePalindromes(
    input: string,
    options: SearchOptions
  ): PalindromeResult[] {
    const parsed = this.parseInput(input);
    if (!parsed) {
      throw new Error('Invalid input format. Use "LEFT|RIGHT" format.');
    }

    const results: PalindromeResult[] = [];

    if (options.algorithm === "brute-force") {
      this.bruteForceSearch(parsed.left, parsed.right, options, results, 0);
    } else {
      this.monteCarloSearch(parsed.left, parsed.right, options, results, 0);
    }

    return results.slice(0, options.maxResults);
  }

  /**
   * Brute-force search for palindromes
   */
  private bruteForceSearch(
    left: string,
    right: string,
    options: SearchOptions,
    results: PalindromeResult[],
    depth: number
  ): void {
    if (depth >= options.maxDepth || results.length >= options.maxResults) {
      return;
    }

    const currentPalindrome = left + " | " + right;

    // Check if current state is already a palindrome
    if (this.isPalindrome(left + right.split("").reverse().join(""))) {
      results.push({
        palindrome: currentPalindrome,
        leftPart: left,
        rightPart: right,
        isComplete: true,
        depth,
      });
      return;
    }

    // Add current partial palindrome
    results.push({
      palindrome: currentPalindrome,
      leftPart: left,
      rightPart: right,
      isComplete: false,
      depth,
    });

    // Try to extend in both directions
    if (options.reverse) {
      // Reverse mode: build from center outward
      this.extendInward(left, right, options, results, depth + 1);
    } else {
      // Normal mode: build from outside inward
      this.extendOutward(left, right, options, results, depth + 1);
    }
  }

  /**
   * Monte Carlo search for palindromes
   */
  private monteCarloSearch(
    left: string,
    right: string,
    options: SearchOptions,
    results: PalindromeResult[],
    depth: number
  ): void {
    if (depth >= options.maxDepth || results.length >= options.maxResults) {
      return;
    }

    const currentPalindrome = left + " | " + right;

    // Check if current state is already a palindrome
    if (this.isPalindrome(left + right.split("").reverse().join(""))) {
      results.push({
        palindrome: currentPalindrome,
        leftPart: left,
        rightPart: right,
        isComplete: true,
        depth,
      });
      return;
    }

    // Add current partial palindrome
    results.push({
      palindrome: currentPalindrome,
      leftPart: left,
      rightPart: right,
      isComplete: false,
      depth,
    });

    // Randomly choose extensions
    const extensions = this.findPossibleExtensions(left, right);
    if (extensions.length === 0) {
      return;
    }

    // Randomly select a few extensions to explore
    const numToExplore = Math.min(3, extensions.length);
    const selectedExtensions = this.shuffleArray(extensions).slice(
      0,
      numToExplore
    );

    for (const extension of selectedExtensions) {
      this.monteCarloSearch(
        extension.left,
        extension.right,
        options,
        results,
        depth + 1
      );
    }
  }

  /**
   * Extend palindrome outward (normal mode)
   */
  private extendOutward(
    left: string,
    right: string,
    options: SearchOptions,
    results: PalindromeResult[],
    depth: number
  ): void {
    const extensions = this.findPossibleExtensions(left, right);

    for (const extension of extensions) {
      this.bruteForceSearch(
        extension.left,
        extension.right,
        options,
        results,
        depth
      );
    }
  }

  /**
   * Extend palindrome inward (reverse mode)
   */
  private extendInward(
    left: string,
    right: string,
    options: SearchOptions,
    results: PalindromeResult[],
    depth: number
  ): void {
    // In reverse mode, we try to fill the gap in the middle
    const extensions = this.findPossibleExtensions(left, right);

    for (const extension of extensions) {
      this.bruteForceSearch(
        extension.left,
        extension.right,
        options,
        results,
        depth
      );
    }
  }

  /**
   * Find possible extensions for current palindrome
   */
  private findPossibleExtensions(
    left: string,
    right: string
  ): Array<{ left: string; right: string }> {
    const extensions: Array<{ left: string; right: string }> = [];

    // Try adding words to the left and corresponding reverse to the right
    for (const word of this.dictionary) {
      if (word.length === 0) continue;

      const newLeft = left + (left.length > 0 ? " " : "") + word;
      const reverseWord = word.split("").reverse().join("");
      const newRight = reverseWord + (right.length > 0 ? " " : "") + right;

      extensions.push({ left: newLeft, right: newRight });
    }

    return extensions;
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate initial palindrome pairs (like the C++ version's default behavior)
   */
  generateInitialPairs(): string[] {
    const pairs: string[] = [];

    for (let i = 0; i < Math.min(100, this.dictionary.length); i++) {
      const word = this.dictionary[i];
      const reverse = word.split("").reverse().join("");

      if (this.trie.search(reverse)) {
        pairs.push(`${word}|${reverse}`);
      }
    }

    return pairs;
  }

  /**
   * Get dictionary statistics
   */
  getDictionaryStats(): {
    wordCount: number;
    avgLength: number;
    maxLength: number;
  } {
    if (this.dictionary.length === 0) {
      return { wordCount: 0, avgLength: 0, maxLength: 0 };
    }

    const totalLength = this.dictionary.reduce(
      (sum, word) => sum + word.length,
      0
    );
    const maxLength = Math.max(...this.dictionary.map((word) => word.length));

    return {
      wordCount: this.dictionary.length,
      avgLength: Math.round((totalLength / this.dictionary.length) * 100) / 100,
      maxLength,
    };
  }
}
