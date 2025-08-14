import type {
  Guess,
  GuessLetterStates,
  Letter,
  LetterState,
} from '../types/types';

const INIT_LETTER_STATE: LetterState = 'incorrect';

type Params = {
  guess: Guess;
  target: string;
};

export const getGuessLetterStates = ({
  guess,
  target,
}: Params): GuessLetterStates => {
  const guessLetterStates: GuessLetterStates = [
    INIT_LETTER_STATE,
    INIT_LETTER_STATE,
    INIT_LETTER_STATE,
    INIT_LETTER_STATE,
    INIT_LETTER_STATE,
  ];

  const remainingTargetLetters: Letter[] = [...target];

  // Pass-1: correct letters
  guess.forEach((letter, index) => {
    if (remainingTargetLetters[index] === letter) {
      guessLetterStates[index] = 'correct';
      // Using `null` to keep positions consistent for subsequent iterations
      remainingTargetLetters[index] = null;
    }
  });

  // Pass-2: possible letters from remaining
  remainingTargetLetters.forEach((targetLetter) => {
    const indexOfPossible = guess.findIndex(
      (guessLetter, guessLetterIndex) =>
        guessLetter === targetLetter &&
        guessLetterStates[guessLetterIndex] === INIT_LETTER_STATE,
    );
    if (indexOfPossible === -1) return;
    guessLetterStates[indexOfPossible] = 'possible';
  });

  return guessLetterStates;
};
