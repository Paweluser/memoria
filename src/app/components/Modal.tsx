"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  isPending?: boolean;
};

export function Modal({
  title,
  children,
  onClose,
  isPending = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      className="m-auto max-h-[90dvh] w-11/12 max-w-md overflow-y-auto rounded-xl border border-(--second-color) bg-(--main-color) p-6 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <h2 className="mb-6 text-xl font-medium">{title}</h2>

      {children}
    </dialog>,
    document.body,
  );
}
