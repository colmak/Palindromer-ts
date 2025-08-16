'use client';

import { useState } from 'react';
import { validateInput, cleanInput } from '@/lib/utils';

interface PalindromeInputProps {
  onInputChange: (input: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function PalindromeInput({ onInputChange, onGenerate, isGenerating }: PalindromeInputProps) {
  const [input, setInput] = useState('WAS|SAW');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    const cleaned = cleanInput(value);
    setInput(cleaned);
    onInputChange(cleaned);
    
    const validation = validateInput(cleaned);
    setError(validation.isValid ? null : validation.error || null);
  };

  const handleGenerate = () => {
    const validation = validateInput(input);
    if (validation.isValid) {
      onGenerate();
    } else {
      setError(validation.error || 'Invalid input');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl border border-zinc-800 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="mb-4">
        <label htmlFor="palindrome-input" className="block text-sm font-medium text-zinc-300 mb-2">
          Enter palindrome with | separator (e.g., &ldquo;WAS|SAW&rdquo;)
        </label>
        <input
          id="palindrome-input"
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border shadow-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 ${
            error ? 'border-amber-600' : 'border-zinc-800'
          }`}
          placeholder="Enter palindrome (e.g., NOTE NO|ONE TON)"
        />
        {error && (
          <p className="mt-1 text-sm text-amber-500">{error}</p>
        )}
      </div>
      
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !!error}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          isGenerating || error
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate Palindromes'}
      </button>
      
      <div className="mt-4 text-sm text-zinc-400">
        <p><strong>Tips:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Use uppercase letters only</li>
          <li>Separate left and right parts with |</li>
          <li>Example: &ldquo;NOTE NO|ONE TON&rdquo;</li>
          <li>The tool will find ways to extend your palindrome</li>
        </ul>
      </div>
    </div>
  );
}
