import type { Board, Letter, LetterState } from '../types/types';

type Params = {
  letter: Letter;
  target: string;
  /**
   * Can be a slice of the board, e.g. when hiding state of current guess
   */
  board: Board[number][];
};

export const getKeyboardLetterState = ({
  letter,
  target,
  board,
}: Params): LetterState => {
  if (letter?.length !== 1 || !board?.flat().includes(letter)) {
    return 'unused';
  }

  if (
    board.some((guess) =>
      guess.some(
        (guessLetter, i) => guessLetter === letter && guessLetter === target[i],
      ),
    )
  ) {
    return 'correct';
  }

  return target.includes(letter) ? 'possible' : 'incorrect';
};
