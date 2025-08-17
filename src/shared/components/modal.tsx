import { useEffect, useRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'dialog'> & {
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ open, onClose, ...props }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open && open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose, open]);

  if (!open) return null;

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
