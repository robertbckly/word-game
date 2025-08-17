import { useState } from 'react';
import { INIT_BOARD, DICTIONARY } from '../shared/constants/constants';
import {
  getIndexOfLastInput,
  getIndexOfNextInput,
  getKeyboardLetterState,
  getTargetForToday,
} from '../shared/utils/utils';
import { type Board as BoardType } from '../shared/types/types';
import { Board } from './components/board';
import { Keyboard } from './components/keyboard';
import { Info } from './components/info';

type GameState = 'active' | 'won' | 'lost';

const target = getTargetForToday();
console.log(`Not-so-subtle hint: ${target}`);

export const Game = () => {
  const [board, setBoard] = useState<BoardType>(INIT_BOARD);
  const [guessIndex, setGuessIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>('active');
  const [showGuessWarning, setShowGuessWarning] = useState(false);

  if (!target) {
    return <p className="p-2 text-center text-white">An error occurred :-(</p>;
  }

  const handleNewLetter = (letter: string) => {
    if (gameState !== 'active') return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[guessIndex];
    if (!guessCopy) return;

    const nextIndex = getIndexOfNextInput(guessCopy);
    if (nextIndex === null) return;
    guessCopy[nextIndex] = letter;

    setBoard(boardCopy);
  };

  const handleBackspace = () => {
    if (gameState !== 'active') return;

    const boardCopy = structuredClone(board);
    const guessCopy = boardCopy[guessIndex];
    if (!guessCopy) return;

    const lastIndex = getIndexOfLastInput(guessCopy);
    guessCopy[lastIndex] = null;

    setBoard(boardCopy);
  };

  const handleEnter = () => {
    if (gameState !== 'active') return;

    const guess = board[guessIndex];
    const isGuessComplete = !!guess && !!guess.at(-1);
    const isGuessAllowed = !!guess && DICTIONARY.has(guess.join(''));
    if (!isGuessComplete) return;

    setShowGuessWarning(!isGuessAllowed);
    if (!isGuessAllowed) return;

    const isGuessCorrect = guess.every((letter, i) => letter === target[i]);
    const isBoardComplete = guessIndex === board.length - 1;

    // Note: `guessIndex` increments again at end so letter states are revealed
    setGuessIndex(guessIndex + 1);
    setGameState(isGuessCorrect ? 'won' : isBoardComplete ? 'lost' : 'active');
  };

  return (
    <main className="relative mx-auto flex h-[100dvh] w-full max-w-lg flex-col items-center justify-evenly gap-8 p-1">
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

      {showGuessWarning && (
        <Info onTimeout={() => setShowGuessWarning(false)}>
          Not in word list
        </Info>
      )}
      {gameState === 'won' && <Info className="animate-bounce">🏆 🎉</Info>}
      {gameState === 'lost' && <Info className="capitalize">{target}</Info>}
    </main>
  );
};
