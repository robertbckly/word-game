import type { Guess } from '../types/types';

export const getIndexOfLastInput = (guess: Guess) => {
  // Last letter is before the first `null`
  const indexOfLastLetter = guess.findIndex((input) => input === null) - 1;
  return indexOfLastLetter >= 0 ? indexOfLastLetter : guess.length - 1;
};
