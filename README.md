# Palindromer TypeScript

A Next.js TypeScript tool for generating palindromes
## Features

- **Algorithms**: Choose between brute-force and Monte-Carlo search methods
- **Trie Data Structure**: Efficient dictionary lookups and word matching
- **Interactive Web Interface**: Modern, responsive UI built with Next.js and Tailwind CSS
- **Real-time Generation**: Generate palindromes from any starting point
- **Customizable Settings**: Adjust algorithm parameters, search depth, and result limits

## How It Works

The Palindromer uses algorithms to help create palindromes by exploring all possible continuations from any starting point:

1. **Brute-Force Algorithm**: Systematically explores all possible word combinations to find complete palindromes. This method is thorough and won't miss any possibilities within the limitiations of the dictionary and time.

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


This project is based on the original C++ Palindromer implementation: https://github.com/HackerPoet/Palindromer

