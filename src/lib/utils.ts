/**
 * Load dictionary from the dictionary.txt file
 */
export async function loadDictionary(): Promise<string[]> {
  try {
    const response = await fetch('/api/dictionary');
    if (!response.ok) {
      throw new Error(`Failed to load dictionary: ${response.statusText}`);
    }
    const text = await response.text();
    return text.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error('Error loading dictionary:', error);
    // Fallback to a small dictionary for development
    return [
      'A', 'I', 'AM', 'AN', 'AS', 'AT', 'BE', 'BY', 'DO', 'GO', 'HE', 'IF', 'IN', 'IS', 'IT', 'ME', 'MY', 'NO', 'OF', 'ON', 'OR', 'SO', 'TO', 'UP', 'US', 'WE',
      'ALL', 'AND', 'ANY', 'ARE', 'BUT', 'CAN', 'FOR', 'GET', 'HAD', 'HAS', 'HER', 'HIM', 'HIS', 'HOW', 'ITS', 'MAY', 'NEW', 'NOT', 'NOW', 'OLD', 'ONE', 'OUR', 'OUT', 'SAW', 'SAY', 'SHE', 'THE', 'TWO', 'WAY', 'WHO', 'WAS', 'YOU'
    ];
  }
}

/**
 * Format palindrome result for display
 */
export function formatPalindrome(left: string, right: string): string {
  return `${left} | ${right}`;
}

/**
 * Clean and normalize input text
 */
export function cleanInput(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z|]/g, '');
}

/**
 * Validate palindrome input format
 */
export function validateInput(input: string): { isValid: boolean; error?: string } {
  const cleaned = cleanInput(input);
  
  if (!cleaned.includes('|')) {
    return { isValid: false, error: 'Input must contain a | separator' };
  }
  
  const parts = cleaned.split('|');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Input must contain exactly one | separator' };
  }
  
  if (parts[0].trim().length === 0 && parts[1].trim().length === 0) {
    return { isValid: false, error: 'At least one side must contain text' };
  }
  
  return { isValid: true };
}

/**
 * Calculate palindrome completion percentage
 */
export function calculateCompletionPercentage(left: string, right: string): number {
  const leftCleaned = left.replace(/\s+/g, '');
  const rightCleaned = right.replace(/\s+/g, '');
  const rightReversed = rightCleaned.split('').reverse().join('');
  
  if (leftCleaned.length === 0 || rightCleaned.length === 0) {
    return 0;
  }
  
  // Calculate how much of the left side matches the reversed right side
  const minLength = Math.min(leftCleaned.length, rightReversed.length);
  let matches = 0;
  
  for (let i = 0; i < minLength; i++) {
    if (leftCleaned[leftCleaned.length - 1 - i] === rightReversed[i]) {
      matches++;
    } else {
      break;
    }
  }
  
  return Math.round((matches / Math.max(leftCleaned.length, rightReversed.length)) * 100);
}
