import type { ComponentProps } from 'react';
import { Modal } from '../../shared/components/components';
import type { GameState } from '../../shared/types/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = ComponentProps<typeof Modal> & {
  gameState: GameState;
};

export const GameOverModal = ({ gameState, ...props }: Props) => {
  if (gameState !== 'won' && gameState !== 'lost') {
    console.log('x');
    return null;
  }

  return (
    <Modal
      {...props}
      className="flex flex-col items-center bg-gray-800 text-white"
    >
      <button
        aria-label="Hide game-over dialog"
        onClick={() => props.onClose()}
        className="aspect-square w-6 cursor-pointer self-end"
      >
        <XMarkIcon />
      </button>

      <h1 className="text-3xl font-bold">
        {gameState === 'won' ? 'Congratulations!' : 'Game over :-('}
      </h1>

      <p className="mt-2 text-lg">
        {gameState === 'won'
          ? 'You guessed correctly!'
          : 'Better luck next time!'}
      </p>

      <li className="my-8 list-none text-2xl">
        <ul>🟩🟩🟩⬛️🟨</ul>
        <ul>🟩🟩🟩⬛️🟨</ul>
        <ul>🟩🟩🟩⬛️🟨</ul>
        <ul>🟩🟩🟩⬛️🟨</ul>
        <ul>🟩🟩🟩⬛️🟨</ul>
        <ul>🟩🟩🟩⬛️🟨</ul>
      </li>
    </Modal>
  );
};
