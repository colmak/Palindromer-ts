"use client";

import { SearchOptions } from "@/lib/palindromer";

interface SettingsProps {
  options: SearchOptions;
  onOptionsChange: (options: SearchOptions) => void;
}

export default function Settings({ options, onOptionsChange }: SettingsProps) {
  const handleChange = (
    key: keyof SearchOptions,
    value: string | number | boolean
  ) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl border border-zinc-800 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">
        Algorithm Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Algorithm
          </label>
          <select
            value={options.algorithm}
            onChange={(e) =>
              handleChange(
                "algorithm",
                e.target.value as "brute-force" | "monte-carlo"
              )
            }
            className="w-full px-3 py-2 border border-zinc-800 bg-zinc-900/60 text-zinc-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600"
          >
            <option value="brute-force">Brute Force</option>
            <option value="monte-carlo">Monte Carlo</option>
          </select>
          <p className="mt-1 text-xs text-zinc-500">
            {options.algorithm === "brute-force"
              ? "Finds all possibilities (thorough but slower)"
              : "Random exploration (faster but may miss options)"}
          </p>
        </div>

        {/* Max Depth */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Max Depth: {options.maxDepth}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={options.maxDepth}
            onChange={(e) => handleChange("maxDepth", parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-1 text-xs text-zinc-500">
            How many word additions to explore
          </p>
        </div>

        {/* Max Results */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Max Results: {options.maxResults}
          </label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={options.maxResults}
            onChange={(e) =>
              handleChange("maxResults", parseInt(e.target.value))
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Maximum number of results to display
          </p>
        </div>

        {/* Reverse Mode */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.reverse}
              onChange={(e) => handleChange("reverse", e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-900 text-blue-600 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600/30"
            />
            <span className="ml-2 text-sm font-medium text-zinc-300">
              Reverse Mode
            </span>
          </label>
          <p className="mt-1 text-xs text-zinc-500">
            Build from center outward instead of outside inward
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
        <h4 className="text-sm font-medium text-zinc-200 mb-2">
          How it works:
        </h4>
        <ul className="text-xs text-zinc-400 space-y-1">
          <li>
            • <strong>Brute Force:</strong> Systematically explores all possible
            word combinations
          </li>
          <li>
            • <strong>Monte Carlo:</strong> Uses randomness to explore promising
            paths deeply
          </li>
          <li>
            • <strong>Depth:</strong> Controls how many words can be added in
            sequence
          </li>
          <li>
            • <strong>Reverse Mode:</strong> Changes the direction of palindrome
            construction
          </li>
        </ul>
      </div>
    </div>
  );
}
