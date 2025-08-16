'use client';

import { useState, useEffect } from 'react';
import { Palindromer, SearchOptions, PalindromeResult } from '@/lib/palindromer';
import { loadDictionary } from '@/lib/utils';
import PalindromeInput from '@/components/PalindromeInput';
import PalindromeResults from '@/components/PalindromeResults';
import Settings from '@/components/Settings';

export default function Home() {
  const [palindromer, setPalindromer] = useState<Palindromer | null>(null);
  const [input, setInput] = useState('WAS|SAW');
  const [results, setResults] = useState<PalindromeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDictionaryLoading, setIsDictionaryLoading] = useState(true);
  const [dictionaryError, setDictionaryError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [dictionaryStats, setDictionaryStats] = useState({ wordCount: 0, avgLength: 0, maxLength: 0 });
  
  const [options, setOptions] = useState<SearchOptions>({
    algorithm: 'brute-force',
    maxDepth: 3,
    maxResults: 100,
    reverse: false
  });

  // Initialize palindromer and load dictionary
  useEffect(() => {
    const initializePalindromer = async () => {
      try {
        const palindromerInstance = new Palindromer();
        const dictionary = await loadDictionary();
        palindromerInstance.loadDictionary(dictionary);
        setPalindromer(palindromerInstance);
        setDictionaryStats(palindromerInstance.getDictionaryStats());
        setDictionaryError(null);
      } catch (error) {
        console.error('Failed to initialize palindromer:', error);
        setDictionaryError('Failed to load dictionary. Using fallback words.');
        // Still create palindromer with fallback dictionary
        const palindromerInstance = new Palindromer();
        palindromerInstance.loadDictionary(['A', 'AM', 'WAS', 'SAW', 'NO', 'ON']);
        setPalindromer(palindromerInstance);
        setDictionaryStats(palindromerInstance.getDictionaryStats());
      } finally {
        setIsDictionaryLoading(false);
      }
    };

    initializePalindromer();
  }, []);

  const handleGenerate = async () => {
    if (!palindromer) return;
    
    setIsLoading(true);
    try {
      const generatedResults = palindromer.generatePalindromes(input, options);
      setResults(generatedResults);
    } catch (error) {
      console.error('Error generating palindromes:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateInitialPairs = () => {
    if (!palindromer) return;
    
    const pairs = palindromer.generateInitialPairs();
    const pairResults: PalindromeResult[] = pairs.map((pair: string) => {
      const [left, right] = pair.split('|');
      return {
        palindrome: pair,
        leftPart: left,
        rightPart: right,
        isComplete: true,
        depth: 0
      };
    });
    setResults(pairResults);
  };

  if (isDictionaryLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dictionary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Palindromer</h1>
              <p className="text-gray-600 mt-1">Generate palindromes using advanced algorithms</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Dictionary: {dictionaryStats.wordCount} words
              </div>
              {dictionaryError && (
                <div className="text-xs text-orange-600 mt-1">{dictionaryError}</div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Input Section */}
          <PalindromeInput
            onInputChange={setInput}
            onGenerate={handleGenerate}
            isGenerating={isLoading}
          />

          {/* Quick Start Section */}
          <div className="text-center">
            <button
              onClick={generateInitialPairs}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate Initial Palindrome Pairs
            </button>
          </div>

          {/* Settings Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showSettings ? 'Hide' : 'Show'} Algorithm Settings
              <svg 
                className={`ml-1 h-4 w-4 transform transition-transform ${showSettings ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Settings Section */}
          {showSettings && (
            <Settings
              options={options}
              onOptionsChange={setOptions}
            />
          )}

          {/* Results Section */}
          <PalindromeResults
            results={results}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Palindromer TypeScript - Port of the original C++ implementation
            </p>
            <p className="mt-2">
              Uses trie data structures and advanced algorithms to generate palindromes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
