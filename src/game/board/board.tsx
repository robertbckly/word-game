import { twMerge } from 'tailwind-merge';
import type {
  Board as BoardType,
  GuessLetterStates,
} from '../../shared/types/types';
import { getGuessLetterStates } from '../../shared/utils/utils';
import { INIT_GUESS_LETTER_STATES } from '../../shared/constants/constants';

type props = {
  board: BoardType;
  target: string;
  activeGuessIndex: number;
};

export const Board = ({ board, target, activeGuessIndex }: props) => (
  <div className="flex aspect-[5/6] h-full max-h-96 flex-col gap-1">
    {board.map((guess, guessIndex) => {
      const guessLetterStates: GuessLetterStates =
        guessIndex < activeGuessIndex
          ? getGuessLetterStates({ guess, target })
          : INIT_GUESS_LETTER_STATES;
      return (
        <div
          key={guessIndex} // guesses won't move
          className="flex gap-[inherit]"
        >
          {guess.map((letter, letterIndex) => {
            const state = guessLetterStates[letterIndex];
            return (
              <div
                key={letterIndex} // letters won't move
                className={twMerge(
                  'flex aspect-square flex-1 items-center justify-center rounded border-2 border-gray-600 text-3xl font-bold text-white uppercase',
                  state === 'incorrect' && 'border-transparent bg-gray-700',
                  state === 'possible' &&
                    'border-transparent bg-yellow-500 grayscale-50',
                  state === 'correct' &&
                    'border-transparent bg-green-600 grayscale-25',
                )}
              >
                {letter}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);
