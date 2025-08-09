import type { Guess } from '../types/types';

export const getIndexOfNextInput = (guess: Guess) => {
  const indexOfLastNull = guess.findIndex((input) => input === null);
  return indexOfLastNull >= 0 ? indexOfLastNull : null;
};
