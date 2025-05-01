import { useState } from "react";
import Header from "./components/Header";
import LangChip from "./components/LangChip";
import { languages } from "./languages";
import LetterChip from "./components/LetterChip";
import Key from "./components/Key";
import {clsx} from "clsx";
import { getFarewellText , getRandomWord } from "./utils/utils";
import ReactConfetti from "react-confetti";


export default function App() {
  // -------------------------
  // ✅ STATE
  // -------------------------
  const [currentWord, setCurrentWord] = useState(()=> getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // -------------------------
  // ✅ CONSTANTS
  // -------------------------
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";

  // Count of wrong guesses (for logic/stats)
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  //game over

  const isGameLost = wrongGuessCount >= languages.length-1;
  //game won 
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length-1];

  const lastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  

  
  // -------------------------
  // ✅ HANDLE GUESSED KEY
  // -------------------------
  function guessedKey(key) {

    setGuessedLetters(prev =>
      prev.includes(key) ? prev : [...prev, key]
    );
  }
  // -------------------------
  // ✅ LETTER CHIP LIST (for currentWord)
  // -------------------------
  const letterChipList = currentWord.split("").map((letter, index) => {

    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    return (
      <LetterChip
      className = {isGameLost && !guessedLetters.includes(letter)? "game-lost" : ""}
      key={index}
      text={shouldRevealLetter ? letter : ""}
    />
    )
  });

  // -------------------------
  // ✅ LANGUAGE CHIP LIST (UI design flavor)
  // -------------------------
  const LangChipList = languages.map((chip , index) => (
    <LangChip
      className = {index < wrongGuessCount? "lost" : ""}
      key={chip.name}
      name={chip.name}
      backgroundColor={chip.backgroundColor}
      color={chip.color}
    />
  ));

  // -------------------------
  // ✅ KEYBOARD BUTTON LIST
  // -------------------------
  const keyBtnList = alphabet.split("").map(alpha => {
    let className = "";

    if (guessedLetters.includes(alpha)) {
      className = currentWord.includes(alpha) ? "correct" : "wrong";
    }

    return (
      <Key
        disabled = {isGameOver}
        list = {guessedLetters}
        key={alpha}
        className={className}
        text={alpha}
        guessedKey={guessedKey}
      />
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    wrongGuess: lastGuessIncorrect && !isGameLost
  })

  function renderGameStatus() {
    if (isGameOver) {
      if (isGameWon) {
        return (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        );
      } else if (isGameLost) {
        return (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        );
      }
    } else if (lastGuessIncorrect) {
      return (
        <h2>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2>
      );
    }
  
    return null;
  }
  

  //reset btn
  function resetGame(){
    setCurrentWord(getRandomWord);
    setGuessedLetters([]);
  }

  // -------------------------
  // ✅ RENDER
  // -------------------------
  return (
    <main>
      {
        isGameWon &&  
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
      }
      <Header />

      <section aria-live="polite" role="status" className={gameStatusClass}>
        {
          renderGameStatus()
        }
      </section>

      <section className="chip-list">{LangChipList}</section>

      <section className="letter-chip">{letterChipList}</section>

      <section 
      className="sr-only" 
      aria-live="polite" 
      role="status">

        <p>
          {currentWord.includes(lastGuessedLetter)? 
          `Correct! the letter ${lastGuessedLetter}`:`Sorry! the letter ${lastGuessedLetter} is not in the word.`}
        </p>
        <p>Current Word: {currentWord.split("").map(letter => guessedLetters.includes(letter)? letter + "." : "blank")}</p>

      </section>

      <section className="btn-section">{keyBtnList}</section>

      {
        isGameOver &&
        <section onClick={resetGame} className="newGameBtn">
          <button>New Game</button>
        </section>
      }
    </main>
  );
}
