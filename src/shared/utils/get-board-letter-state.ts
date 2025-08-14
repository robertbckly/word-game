import type { Board, LetterState } from '../types/types';

type Params = {
  position: [number, number];
  target: string;
  /**
   * Can be a slice of the board, e.g. when hiding state of current guess
   */
  board: Board[number][];
};

export const getBoardLetterState = ({
  position,
  target,
  board,
}: Params): LetterState => {
  const [guessIndex, letterIndex] = position;
  const boardLetter = board[guessIndex]?.[letterIndex];

  if (!boardLetter) {
    return 'unused';
  }

  if (boardLetter === target[letterIndex]) {
    return 'correct';
  }

  return target.includes(boardLetter) ? 'possible' : 'incorrect';
};
