import { twMerge } from 'tailwind-merge';
import type { Board as BoardType } from '../../shared/types/types';

type props = {
  board: BoardType;
  target: string;
  guessIndex: number;
};

export const Board = ({ board, target, guessIndex: guessIndexProp }: props) => (
  <div className="flex aspect-[5/6] h-full max-h-96 flex-col gap-1">
    {board.map((guess, guessIndex) => (
      <div
        key={guessIndex} // guesses won't move
        className="flex gap-[inherit]"
      >
        {guess.map((input, inputIndex) => {
          const canHighlight = guessIndex < guessIndexProp;
          const isCorrect = input && target[inputIndex] === input;
          const isPossible = !isCorrect && input && target.includes(input);
          return (
            <div
              key={inputIndex} // inputs won't move
              className={twMerge(
                'flex aspect-square flex-1 items-center justify-center rounded border-2 border-gray-600 text-3xl font-bold text-white uppercase',
                canHighlight &&
                  isPossible &&
                  'border-transparent bg-yellow-500 grayscale-50',
                canHighlight &&
                  isCorrect &&
                  'border-transparent bg-green-600 grayscale-25',
              )}
            >
              {input}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);
