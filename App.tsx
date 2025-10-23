
import React, { useState, useEffect, useCallback } from 'react';
import { MAX_ATTEMPTS, MAX_NUMBER } from './constants';
import type { GameStatus, Guess } from './types';
import GuessInput from './components/GuessInput';
import GuessHistory from './components/GuessHistory';
import GameStatusDisplay from './components/GameStatusDisplay';

function App() {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [feedback, setFeedback] = useState<string>('');

  const attemptsLeft = MAX_ATTEMPTS - guesses.length;

  const startNewGame = useCallback(() => {
    const newSecretNumber = Math.floor(Math.random() * (MAX_NUMBER + 1));
    setSecretNumber(newSecretNumber);
    setGuesses([]);
    setGameStatus('playing');
    setFeedback(`I'm thinking of a number between 0 and ${MAX_NUMBER}. You have ${MAX_ATTEMPTS} attempts.`);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = (guessValue: number) => {
    if (gameStatus !== 'playing') return;

    let result: Guess['result'];
    let newFeedback: string;

    if (guessValue === secretNumber) {
      result = 'correct';
      setGameStatus('won');
      newFeedback = `🎉 Hurrah! You got my secret number: ${secretNumber}! 🎉`;
    } else {
      if (guessValue < secretNumber) {
        result = 'lower';
        newFeedback = `Oops! ${guessValue} is smaller than my number.`;
      } else {
        result = 'higher';
        newFeedback = `Oops! ${guessValue} is bigger than my number.`;
      }

      if (attemptsLeft - 1 === 0) {
        setGameStatus('lost');
        newFeedback = `Opps! You failed to guess my secret number, which was ${secretNumber}.`;
      }
    }

    setGuesses(prevGuesses => [...prevGuesses, { value: guessValue, result }]);
    setFeedback(newFeedback);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Guess My Number
          </h1>
        </header>
        
        <main className="relative bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-slate-700">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 rounded-2xl animate-gradient opacity-30 blur-2xl"></div>
          
          <GameStatusDisplay 
            status={gameStatus} 
            feedback={feedback}
            attemptsLeft={attemptsLeft}
            onRestart={startNewGame}
          />
          
          {gameStatus === 'playing' && (
            <GuessInput onSubmit={handleGuess} />
          )}

          <GuessHistory guesses={guesses} />
        </main>

        <footer className="text-center mt-8 text-slate-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
