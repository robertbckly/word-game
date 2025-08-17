export type Letter = string | null;
export type LetterState = 'correct' | 'incorrect' | 'possible' | 'unused';
export type Guess = [Letter, Letter, Letter, Letter, Letter]; // x5
export type GuessLetterStates = [
  LetterState,
  LetterState,
  LetterState,
  LetterState,
  LetterState,
]; // x5
export type Board = [Guess, Guess, Guess, Guess, Guess, Guess]; // x6
export type GameState = 'active' | 'won' | 'lost';
