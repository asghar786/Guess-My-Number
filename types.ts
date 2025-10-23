
export type GuessResult = 'lower' | 'higher' | 'correct';

export interface Guess {
  value: number;
  result: GuessResult;
}

export type GameStatus = 'playing' | 'won' | 'lost';
