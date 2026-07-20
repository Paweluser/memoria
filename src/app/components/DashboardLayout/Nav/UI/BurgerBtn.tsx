import { Menu } from "lucide-react";

type BurgerBtnProps = {
  onClick: () => void;
}

export function BurgerBtn({onClick}: BurgerBtnProps) {
  return (
    <button onClick={onClick} className="-space-y-4 p-2 cursor-pointer">
      <Menu className="h-7 w-7" />
    </button>
  );
}
