import { useState } from 'react';
import { Board } from './board/board';
import { Keyboard } from './keyboard/keyboard';
import { INIT_BOARD, DICTIONARY } from '../shared/constants/constants';
import {
  getIndexOfLastInput,
  getIndexOfNextInput,
  getKeyboardLetterState,
  getTargetForToday,
} from '../shared/utils/utils';
import { type Board as BoardType } from '../shared/types/types';

const target = getTargetForToday();
console.log(`Not-so-subtle hint: ${target}`);

export const Game = () => {
  const [board, setBoard] = useState<BoardType>(INIT_BOARD);
  const [guessIndex, setGuessIndex] = useState(0);
  const [done, setDone] = useState(false);

  if (!target) {
    return <p className="p-2 text-center text-white">An error occurred :-(</p>;
  }

  const handleNewLetter = (letter: string) => {
    if (done) return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[guessIndex];
    if (!guessCopy) return;

    const nextIndex = getIndexOfNextInput(guessCopy);
    if (nextIndex === null) return;
    guessCopy[nextIndex] = letter;

    setBoard(boardCopy);
  };

  const handleBackspace = () => {
    if (done) return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[guessIndex];
    if (!guessCopy) return;

    const lastIndex = getIndexOfLastInput(guessCopy);
    guessCopy[lastIndex] = null;

    setBoard(boardCopy);
  };

  const handleEnter = () => {
    if (done) return;

    const guess = board[guessIndex];
    const isGuessComplete = Boolean(guess?.at(-1));

    if (guess && isGuessComplete && !DICTIONARY.has(guess.join(''))) {
      return;
    }

    const isBoardComplete = isGuessComplete && guessIndex === board.length - 1;
    const isGuessCorrect = Boolean(
      guess?.every((letter, index) => target[index] === letter),
    );

    if (isGuessComplete) {
      setGuessIndex(guessIndex + 1);
    }

    if (isGuessCorrect || isBoardComplete) {
      setDone(true);
    }
  };

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-lg flex-col items-center justify-evenly gap-8 p-1">
      <Board board={board} target={target} activeGuessIndex={guessIndex} />
      <Keyboard
        getLetterState={(letter) =>
          getKeyboardLetterState({
            letter,
            target,
            board: board.slice(0, guessIndex),
          })
        }
        onNewLetter={handleNewLetter}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
    </main>
  );
};
