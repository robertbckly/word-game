import { useEffect, useRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'dialog'> & {
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ open, onClose, ...props }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync dialog open-state via modal methods
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('close', onClose);
    if (!dialog.open && open) dialog.showModal();
    if (dialog.open && !open) dialog.close();

    return () => dialog.removeEventListener('close', onClose);
  }, [onClose, open]);

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={twMerge(
        'm-auto w-sm max-w-[90vw] rounded p-4',
        props.className,
      )}
    />
  );
};
