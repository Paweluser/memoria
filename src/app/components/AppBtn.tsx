import { ReactNode } from "react";

type AppBtnProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export function AppBtn({ onClick, children, disabled = false }: AppBtnProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color) disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}
