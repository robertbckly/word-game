import { Board } from './board/board';
import { Keyboard } from './keyboard/keyboard';

export const Game = () => (
  <main className="mx-auto flex h-[100dvh] w-full max-w-lg flex-col items-center justify-evenly p-1">
    <Board />
    <Keyboard />
  </main>
);
