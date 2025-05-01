# Assembly: Endgame

Assembly: Endgame is a fun and interactive word-guessing game where players must guess a randomly selected word within a limited number of attempts. Each incorrect guess eliminates a programming language, and the goal is to save the programming world from Assembly!

## Features

- **Word Guessing Game**: Guess the word in under 8 attempts.
- **Dynamic Keyboard**: Interactive on-screen keyboard for guessing letters.
- **Programming Language Chips**: Visual representation of eliminated programming languages.
- **Game Status**: Displays win, loss, or progress updates dynamically.
- **Confetti Celebration**: Celebrate your victory with confetti animations.
- **Accessible Design**: Includes ARIA roles and live regions for screen readers.

## Project Structure
```
Assembly - Endgame
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   └── hangman-game (1).png
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Key.jsx
│   │   ├── LangChip.jsx
│   │   └── LetterChip.jsx
│   ├── index.css
│   ├── index.jsx
│   ├── languages.js
│   ├── utils
│   │   └── utils.js
│   └── words.js
└── vite.config.js
```

### Key Files

- **`src/App.jsx`**: Main application logic and UI rendering.
- **`src/components/`**: Reusable React components like `Header`, `Key`, `LangChip`, and `LetterChip`.
- **`src/utils/utils.js`**: Utility functions for random word selection and farewell messages.
- **`src/languages.js`**: List of programming languages with their styles.
- **`src/words.js`**: Word bank for the game.
