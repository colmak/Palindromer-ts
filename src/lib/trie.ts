export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  
  constructor() {}
}

export class Trie {
  private root: TrieNode;
  
  constructor() {
    this.root = new TrieNode();
  }
  
  /**
   * Insert a word into the trie
   */
  insert(word: string): void {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
  }
  
  /**
   * Search for a word in the trie
   */
  search(word: string): boolean {
    const node = this.searchNode(word);
    return node !== null && node.isEndOfWord;
  }
  
  /**
   * Check if any word starts with the given prefix
   */
  startsWith(prefix: string): boolean {
    return this.searchNode(prefix) !== null;
  }
  
  /**
   * Find a node for the given prefix
   */
  private searchNode(prefix: string): TrieNode | null {
    let current = this.root;
    
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    
    return current;
  }
  
  /**
   * Get all words that start with the given prefix
   */
  getWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    const node = this.searchNode(prefix);
    
    if (node) {
      this.dfs(node, prefix, words);
    }
    
    return words;
  }
  
  /**
   * Depth-first search to collect all words from a node
   */
  private dfs(node: TrieNode, currentWord: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.dfs(childNode, currentWord + char, words);
    }
  }
  
  /**
   * Check if we can form words from the given letters
   */
  canFormWords(letters: string): string[] {
    const words: string[] = [];
    this.findWords(this.root, letters, '', words);
    return words;
  }
  
  /**
   * Find all possible words that can be formed from the given letters
   */
  private findWords(node: TrieNode, remainingLetters: string, currentWord: string, words: string[]): void {
    if (node.isEndOfWord && currentWord.length > 0) {
      words.push(currentWord);
    }
    
    for (let i = 0; i < remainingLetters.length; i++) {
      const char = remainingLetters[i];
      
      if (node.children.has(char)) {
        const newRemainingLetters = remainingLetters.slice(0, i) + remainingLetters.slice(i + 1);
        this.findWords(
          node.children.get(char)!,
          newRemainingLetters,
          currentWord + char,
          words
        );
      }
    }
  }
  
  /**
   * Load dictionary words from an array
   */
  loadDictionary(words: string[]): void {
    for (const word of words) {
      if (word.trim()) {
        this.insert(word.trim().toUpperCase());
      }
    }
  }
}
