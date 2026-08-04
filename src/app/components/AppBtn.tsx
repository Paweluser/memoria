import { ReactNode } from "react";

type AppBtnProps = {
  onClick: () => void;
  children: ReactNode;
};

export function AppBtn({ onClick, children }: AppBtnProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
    >
      {children}
    </button>
  );
}
