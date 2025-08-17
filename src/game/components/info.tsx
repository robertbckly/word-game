import { useEffect, useRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const DEFAULT_TIMEOUT_MS = 2000;

type Props = ComponentProps<'p'> & {
  /** @default 2000 */
  timeoutMs?: number;
  onTimeout?: () => void;
};

export const Info = ({
  timeoutMs = DEFAULT_TIMEOUT_MS,
  onTimeout,
  ...props
}: Props) => {
  const timeoutRef = useRef<number | null>(null);

  // If `onTimeout` provided, call it after timeout
  // (tracked via ref so it's not restarted with each render)
  useEffect(() => {
    if (!onTimeout || timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      onTimeout();
    }, timeoutMs);
  }, [onTimeout, timeoutMs]);

  return (
    <p
      {...props}
      className={twMerge(
        'absolute top-[10lvh] mx-auto max-w-2xs min-w-[5rem] rounded bg-black/95 px-3 py-2 text-center font-semibold wrap-anywhere text-white',
        props.className,
      )}
    />
  );
};
