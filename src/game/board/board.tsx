import type { Board as BoardType } from '../../shared/types/types';

type props = {
  board: BoardType;
};

export const Board = ({ board }: props) => (
  <div className="flex aspect-[5/6] h-full max-h-96 flex-col gap-1">
    {board.map((guess, index) => (
      <div
        key={index} // items won't move
        className="flex gap-[inherit]"
      >
        {guess.map((input, index) => (
          <div
            key={index} // items won't move
            className="flex aspect-square flex-1 items-center justify-center rounded border-2 border-gray-600 text-3xl font-bold text-white uppercase"
          >
            {input}
          </div>
        ))}
      </div>
    ))}
  </div>
);
