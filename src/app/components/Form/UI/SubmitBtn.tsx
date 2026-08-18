'use client'

import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
  children: React.ReactNode;
  isPending?: boolean;
};

export function SubmitBtn({ children, isPending }: SubmitBtnProps) {
  const { pending } = useFormStatus()

  const isLoading = isPending !== undefined ? isPending : pending;

  return (
    <button
      type="submit"
      disabled={isLoading}
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
    >
      {isLoading ? "Zapisuję..." : children}
    </button>
  );
}
