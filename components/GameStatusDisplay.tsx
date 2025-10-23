
import React from 'react';
import type { GameStatus } from '../types';
import { RestartIcon } from './icons/RestartIcon';

interface GameStatusDisplayProps {
  status: GameStatus;
  feedback: string;
  attemptsLeft: number;
  onRestart: () => void;
}

const GameStatusDisplay: React.FC<GameStatusDisplayProps> = ({ status, feedback, attemptsLeft, onRestart }) => {
  const isGameOver = status === 'won' || status === 'lost';

  return (
    <div className="text-center mb-6 min-h-[120px] flex flex-col justify-between">
      <p className={`text-xl font-medium transition-opacity duration-300 ${isGameOver ? 'text-2xl' : ''}`}>
        {feedback}
      </p>
      
      {status === 'playing' && (
        <p className="text-slate-400 mt-2 text-lg">
          Attempts Left: <span className="font-bold text-purple-400">{attemptsLeft}</span>
        </p>
      )}

      {isGameOver && (
        <div className="mt-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-105"
          >
            <RestartIcon />
            Play More?
          </button>
        </div>
      )}
    </div>
  );
};

export default GameStatusDisplay;
