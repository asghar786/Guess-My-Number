
import React, { useState } from 'react';
import { MAX_NUMBER } from '../constants';

interface GuessInputProps {
  onSubmit: (guess: number) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guess = parseInt(inputValue, 10);
    if (!isNaN(guess)) {
      onSubmit(guess);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        min="0"
        max={MAX_NUMBER}
        placeholder="Enter your guess..."
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        autoFocus
      />
      <button
        type="submit"
        className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
        disabled={!inputValue}
      >
        Guess
      </button>
    </form>
  );
};

export default GuessInput;
