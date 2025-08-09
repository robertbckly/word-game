import { BackspaceIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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

export const Keyboard = () => (
  <div className="flex w-full flex-col justify-center gap-[0.5rem] bg-black">
    {KEY_ROWS.map((row) => (
      <div
        key={row.join('')}
        className="flex flex-1 items-stretch justify-center gap-[inherit] text-center"
      >
        {row.map((letter) => (
          <button
            key={letter}
            aria-hidden={letter === BLANK}
            className={twMerge(
              'cursor-pointer overflow-hidden rounded bg-gray-500 py-4 font-bold text-white uppercase *:m-auto',
              // Multi-letter buttons are 1.5x wide
              letter && letter.length === 1
                ? 'w-[10vw] text-xl'
                : 'w-[15vw] text-xs',
              // Invisible 'blank' buttons ensure key alignment in the second
              // row by making up the half-key width either side, minus the
              // extra flex-layout gaps
              letter === BLANK && 'invisible w-[calc(5vw-0.5rem)]',
            )}
          >
            {REPLACEMENTS[letter] || letter}
          </button>
        ))}
      </div>
    ))}
  </div>
);
