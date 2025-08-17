import { BackspaceIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import type { GameState, LetterState } from '../../shared/types/types';

const BLANK = '\u00A0';
const ENTER = 'enter';
const CLEAR = 'clear';

const REPLACEMENTS: Record<string, ReactNode> = {
  [CLEAR]: <BackspaceIcon width="2.5em" />,
} as const;

const KEY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  [BLANK, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', BLANK],
  [ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', CLEAR],
] as const;

type Props = {
  gameState: GameState;
  getLetterState: (letter: string) => LetterState;
  onNewLetter: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
};

export const Keyboard = ({
  gameState,
  getLetterState,
  onNewLetter,
  onBackspace,
  onEnter,
}: Props) => {
  // Process both virtual and device-keyboard input
  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState !== 'active') return;
      if (key === CLEAR) return onBackspace();
      if (key === ENTER) return onEnter();
      // Filter for single alpha character
      return /^[a-zA-Z]$/.test(key) && onNewLetter(key);
    },
    [gameState, onBackspace, onEnter, onNewLetter],
  );

  // Accept device-keyboard input
  useEffect(() => {
    const handleDeviceKeyUp = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === 'Backspace') return handleKeyPress(CLEAR);
      if (key === 'Enter') return handleKeyPress(ENTER);
      return handleKeyPress(key);
    };

    document.addEventListener('keyup', handleDeviceKeyUp);
    return () => document.removeEventListener('keyup', handleDeviceKeyUp);
  }, [handleKeyPress]);

  // Render virtual keyboard
  return (
    <div className="flex w-full flex-col justify-center gap-[0.5rem] bg-black">
      {KEY_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex} // rows won't move
          className="flex flex-1 items-stretch justify-center gap-[inherit] text-center"
        >
          {row.map((key, keyIndex) => {
            const state = getLetterState(key);
            return (
              <button
                key={keyIndex} // keys won't move
                aria-hidden={key === BLANK}
                onClick={() => handleKeyPress(key)}
                className={twMerge(
                  'cursor-pointer overflow-hidden rounded bg-gray-500 py-4 font-bold text-white uppercase *:m-auto active:bg-gray-400',
                  // Multi-letter buttons are 1.5x wide
                  key && key.length === 1
                    ? 'w-[10vw] text-xl'
                    : 'w-[15vw] text-xs',
                  // Invisible 'blank' buttons ensure key alignment in the second
                  // row by making up the half-key width either side, minus the
                  // extra flex-layout gaps
                  key === BLANK && 'invisible w-[calc(5vw-0.5rem)]',
                  state === 'incorrect' && 'bg-gray-700',
                  state === 'possible' && 'bg-yellow-500 grayscale-50',
                  state === 'correct' && 'bg-green-600 grayscale-25',
                )}
              >
                {REPLACEMENTS[key] || key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
