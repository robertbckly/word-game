import { useState } from 'react';
import { Board } from './board/board';
import { Keyboard } from './keyboard/keyboard';
import { INIT_BOARD } from '../shared/constants/constants';
import {
  getIndexOfLastInput,
  getIndexOfNextInput,
} from '../shared/utils/utils';

export const Game = () => {
  const [board, setBoard] = useState(INIT_BOARD);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState(false);

  const handleNewLetter = (letter: string) => {
    if (done) return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[attempt];
    if (!guessCopy) return;

    const nextIndex = getIndexOfNextInput(guessCopy);
    if (nextIndex === null) return;
    guessCopy[nextIndex] = letter;

    setBoard(boardCopy);
  };

  const handleBackspace = () => {
    if (done) return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[attempt];
    if (!guessCopy) return;

    const lastIndex = getIndexOfLastInput(guessCopy);
    guessCopy[lastIndex] = null;

    setBoard(boardCopy);
  };

  const handleEnter = () => {
    if (done) return;

    const guess = board[attempt];
    const isGuessComplete = Boolean(guess?.at(-1));
    const isBoardComplete = isGuessComplete && attempt === board.length - 1;

    // TODO
    if (isBoardComplete) {
      alert('Game over!');
      setDone(true);
      return;
    }

    if (isGuessComplete) setAttempt(attempt + 1);
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
