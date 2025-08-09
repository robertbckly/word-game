import { useState } from 'react';
import type { Board as BoardType } from '../shared/types/types';
import { Board } from './board/board';
import { Keyboard } from './keyboard/keyboard';
import {
  getIndexOfLastInput,
  getIndexOfNextInput,
} from '../shared/utils/utils';

const INIT_BOARD: BoardType = [
  ['a', 'd', 'e', 'i', 'u'],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

export const Game = () => {
  const [board, setBoard] = useState(INIT_BOARD);
  const [attempt, setAttempt] = useState(0);

  const handleNewLetter = (letter: string) => {
    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[attempt];
    if (!guessCopy) return;

    const nextIndex = getIndexOfNextInput(guessCopy);
    if (nextIndex === null) return;
    guessCopy[nextIndex] = letter;

    setBoard(boardCopy);
  };

  const handleBackspace = () => {
    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[attempt];
    if (!guessCopy) return;

    const lastIndex = getIndexOfLastInput(guessCopy);
    guessCopy[lastIndex] = null;

    setBoard(boardCopy);
  };

  const handleEnter = () => {
    const currentGuess = board[attempt];
    if (currentGuess?.at(-1)) setAttempt(attempt + 1);
  };

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-lg flex-col items-center justify-evenly gap-8 p-1">
      <Board board={board} />
      <Keyboard
        onNewLetter={handleNewLetter}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
    </main>
  );
};
