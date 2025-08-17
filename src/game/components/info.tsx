import { useEffect, type ComponentProps } from 'react';
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
  // If `onTimeout` provided, call it after timeout
  useEffect(() => {
    if (!onTimeout) return;
    const timeout = setTimeout(onTimeout, timeoutMs);
    return () => clearTimeout(timeout);
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
