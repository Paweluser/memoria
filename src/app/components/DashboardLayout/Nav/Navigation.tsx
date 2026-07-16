import { Flame } from "lucide-react";
import { BurgerBtn } from "./BurgerBtn";

export function Navigation() {
  return (
    <nav className="relative top-0 flex justify-between border-b-2 p-3">
      <h1 className="mt-5 font-(family-name:--julius) text-3xl font-bold tracking-widest">
        MEMOR
        <span className="relative inline-block">
          I
          <Flame className="absolute -top-6 left-1/2 size-6 translate-x-[-60%] text-(--accent-color) md:-top-8 md:size-9" />
        </span>
        A
      </h1>
      <BurgerBtn />
    </nav>
  );
}
