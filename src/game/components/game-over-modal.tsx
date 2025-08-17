import type { ComponentProps } from 'react';
import { Modal } from '../../shared/components/components';
import type { Board, GameState, LetterState } from '../../shared/types/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getGuessLetterStates } from '../../shared/utils/utils';

const EMOJI: Readonly<Record<LetterState, string>> = {
  correct: '🟩',
  possible: '🟨',
  incorrect: '⬛️',
  unused: '',
};

type Props = ComponentProps<typeof Modal> & {
  gameState: GameState;
  board: Board;
  target: string;
  activeGuessIndex: number;
};

export const GameOverModal = ({
  gameState,
  board,
  target,
  activeGuessIndex,
  ...props
}: Props) => {
  if (gameState !== 'won' && gameState !== 'lost') {
    return null;
  }

  return (
    <Modal {...props} className="bg-gray-800 text-white">
      <div className="flex flex-col items-center">
        <button
          aria-label="Hide game-over dialog"
          onClick={props.onClose}
          className="aspect-square w-6 cursor-pointer self-end"
        >
          <XMarkIcon />
        </button>

        <h2 className="text-3xl font-bold">
          {gameState === 'won' ? 'Congratulations!' : 'Game over :-('}
        </h2>

        <p className="mt-2 text-lg">
          {gameState === 'won'
            ? 'You guessed correctly!'
            : 'Better luck next time!'}
        </p>

        {/* Emoji result-map */}
        <ul className="my-8 text-2xl">
          {board.map((guess, guessIndex) => {
            if (guessIndex > activeGuessIndex) return null;
            const letterStates = getGuessLetterStates({ guess, target });
            return (
              // Guesses won't move; index key is fine
              <li key={guessIndex}>
                {letterStates.map((state) => EMOJI[state])}
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};
