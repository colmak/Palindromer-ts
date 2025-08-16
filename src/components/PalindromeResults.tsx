'use client';

import { PalindromeResult } from '@/lib/palindromer';
import { calculateCompletionPercentage } from '@/lib/utils';

interface PalindromeResultsProps {
  results: PalindromeResult[];
  isLoading: boolean;
}

export default function PalindromeResults({ results, isLoading }: PalindromeResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Generating palindromes...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center py-8 text-gray-500">
          <p>No palindromes generated yet. Enter a starting point above and click &ldquo;Generate Palindromes&rdquo;.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Palindromes ({results.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {results.map((result, index) => {
            const completionPercentage = calculateCompletionPercentage(result.leftPart, result.rightPart);
            
            return (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-mono text-lg mb-2">
                      <span className="text-blue-600">{result.leftPart}</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="text-green-600">{result.rightPart}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Depth: {result.depth}</span>
                      <span>
                        Status: {result.isComplete ? (
                          <span className="text-green-600 font-medium">Complete</span>
                        ) : (
                          <span className="text-orange-600 font-medium">Partial</span>
                        )}
                      </span>
                      <span>Completion: {completionPercentage}%</span>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    {result.isComplete && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Palindrome
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress bar for completion percentage */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        result.isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
