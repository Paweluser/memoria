import { Menu, X } from "lucide-react";

type BurgerBtnProps = {
  onClick: () => void;
  isOpen: boolean;
};

export function BurgerBtn({ onClick, isOpen }: BurgerBtnProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer -space-y-4 p-2 md:hidden"
    >
      {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
    </button>
  );
}
