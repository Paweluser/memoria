'use client'

import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
  children: React.ReactNode;
};

export function SubmitBtn({ children }: SubmitBtnProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
    >
      {pending ? "Zapisuję..." : children}
    </button>
  );
}
