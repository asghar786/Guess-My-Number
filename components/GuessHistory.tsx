
import React from 'react';
import type { Guess } from '../types';

interface GuessHistoryProps {
  guesses: Guess[];
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return null;
  }

  const resultClasses: Record<Guess['result'], string> = {
    lower: 'bg-red-500/70 border-red-400',
    higher: 'bg-green-500/70 border-green-400',
    correct: 'bg-yellow-500/80 border-yellow-400 animate-pulse',
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-400 mb-3 text-center">Your Guesses</h2>
      <div className="flex flex-wrap justify-center gap-3 p-4 bg-slate-900/30 rounded-lg min-h-[50px]">
        {guesses.map((guess, index) => (
          <div
            key={index}
            className={`px-4 py-2 text-white font-bold text-lg rounded-md shadow-lg border transition-transform transform hover:scale-110 ${resultClasses[guess.result]}`}
          >
            {guess.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessHistory;
