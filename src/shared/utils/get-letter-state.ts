import type { Board, Letter, LetterState } from '../types/types';

const NULL_POSITION = -1;

type Params = {
  /**
   * Can be a slice of the board, e.g. when hiding state of current guess
   */
  board: Board[number][];
  target: string;
} & (
  | {
      scope: 'board';
      /** `[guessIndex, letterIndex]` */
      position: [number, number];
    }
  | {
      scope: 'keyboard';
      letter: Letter;
    }
);

export const getLetterState = ({
  board,
  target,
  ...params
}: Params): LetterState => {
  const isBoardScope = params.scope === 'board';
  const isKeyboardScope = params.scope === 'keyboard';

  if (
    (isKeyboardScope && params.letter?.length !== 1) ||
    (isKeyboardScope && !board?.flat().includes(params.letter))
  ) {
    return 'unused';
  }

  if (isKeyboardScope && params.letter && !target.includes(params.letter)) {
    return 'incorrect';
  }

  const [guessIndex, letterIndex] = isBoardScope
    ? params.position
    : [NULL_POSITION, NULL_POSITION];

  const isValidPosition =
    guessIndex !== NULL_POSITION && letterIndex !== NULL_POSITION;

  if (
    isBoardScope &&
    isValidPosition &&
    board[guessIndex]?.[letterIndex] === target[letterIndex]
  ) {
    return 'correct';
  }

  if (
    isBoardScope &&
    isValidPosition &&
    board[guessIndex]?.[letterIndex] &&
    target.includes(board[guessIndex][letterIndex])
  ) {
    return 'possible';
  }

  if (
    isKeyboardScope &&
    board.some((guess) =>
      guess.some(
        (letter, i) => letter === params.letter && letter === target[i],
      ),
    )
  ) {
    return 'correct';
  }

  if (isKeyboardScope && params.letter && target.includes(params.letter)) {
    return 'possible';
  }

  return 'unused';
};
