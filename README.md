# Palindromer TypeScript

A Next.js TypeScript port of the original C++ Palindromer tool for generating palindromes using advanced algorithms.

## Features

- **Advanced Algorithms**: Choose between brute-force and Monte-Carlo search methods
- **Trie Data Structure**: Efficient dictionary lookups and word matching
- **Interactive Web Interface**: Modern, responsive UI built with Next.js and Tailwind CSS
- **Real-time Generation**: Generate palindromes from any starting point
- **Customizable Settings**: Adjust algorithm parameters, search depth, and result limits

## How It Works

The Palindromer uses sophisticated algorithms to help create palindromes by exploring all possible continuations from any starting point:

1. **Brute-Force Algorithm**: Systematically explores all possible word combinations to find complete palindromes. This method is thorough and won't miss any possibilities.

2. **Monte-Carlo Algorithm**: Uses randomness to explore promising branches deeply. This is faster but may not find all possible combinations.

3. **Trie Data Structure**: Efficiently stores and searches through dictionary words for fast lookups.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd palindromer-ts
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Usage

1. Enter a palindrome starting point in the format `LEFT|RIGHT` (e.g., `WAS|SAW`)
2. Choose your algorithm settings (optional)
3. Click "Generate Palindromes" to see all possible extensions

### Example Workflow

Start with a simple palindrome pair:
```
WAS|SAW
```

The tool might suggest extensions like:
```
I WAS|SAW I
A MAN WAS|SAW A MAN
```

Continue building longer palindromes:
```
NOTE NO|ONE TON
NOTE NO ERASER|RES ARE ONE TON
```

### Algorithm Settings

- **Algorithm Type**: Choose between brute-force (thorough) or Monte-Carlo (fast exploration)
- **Max Depth**: Control how many word additions to explore (1-10)
- **Max Results**: Limit the number of results displayed (10-500)
- **Reverse Mode**: Build from center outward instead of outside inward

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── dictionary/          # API endpoint for dictionary
│   ├── page.tsx                 # Main application page
│   └── layout.tsx              # Root layout
├── components/
│   ├── PalindromeInput.tsx     # Input component
│   ├── PalindromeResults.tsx   # Results display component
│   └── Settings.tsx            # Algorithm settings component
├── lib/
│   ├── palindromer.ts          # Main palindrome generation logic
│   ├── trie.ts                 # Trie data structure implementation
│   └── utils.ts                # Utility functions
└── dictionary.txt              # Word dictionary
```

## Key Components

### Palindromer Class
The main class that handles palindrome generation using the specified algorithm and settings.

### Trie Class
Efficient data structure for storing and searching dictionary words.

### React Components
- **PalindromeInput**: Input form with validation
- **PalindromeResults**: Display generated palindromes with completion indicators
- **Settings**: Algorithm configuration panel

## Algorithms Explained

### Brute-Force Search
- Systematically explores all possible word combinations
- Guarantees finding all possible palindromes
- Best for thorough exploration
- Slower but complete

### Monte-Carlo Search
- Uses randomness to explore branches
- Faster execution
- Good for inspiration and quick results
- May miss some possibilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is based on the original C++ Palindromer implementation and is provided as-is for educational and personal use.

## Acknowledgments

- Original C++ implementation and algorithm design
- Next.js and React communities
- Tailwind CSS for styling
- TypeScript for type safety
