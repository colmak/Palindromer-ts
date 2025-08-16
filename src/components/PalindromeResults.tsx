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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-zinc-400">Generating palindromes...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center py-8 text-zinc-500">
          <p>No palindromes generated yet. Enter a starting point above and click &ldquo;Generate Palindromes&rdquo;.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">
            Generated Palindromes ({results.length})
          </h2>
        </div>
        
        <div className="divide-y divide-zinc-800">
          {results.map((result, index) => {
            const completionPercentage = calculateCompletionPercentage(result.leftPart, result.rightPart);
            
            return (
              <div key={index} className="p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-mono text-lg mb-2">
                      <span className="text-blue-400">{result.leftPart}</span>
                      <span className="mx-2 text-zinc-500">|</span>
                      <span className="text-emerald-400">{result.rightPart}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-zinc-400">
                      <span>Depth: {result.depth}</span>
                      <span>
                        Status: {result.isComplete ? (
                          <span className="text-emerald-400 font-medium">Complete</span>
                        ) : (
                          <span className="text-amber-400 font-medium">Partial</span>
                        )}
                      </span>
                      <span>Completion: {completionPercentage}%</span>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    {result.isComplete && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ✓ Palindrome
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress bar for completion percentage */}
                <div className="mt-3">
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        result.isComplete ? 'bg-emerald-500' : 'bg-blue-500'
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
