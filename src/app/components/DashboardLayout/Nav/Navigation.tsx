"use client";

import { Flame } from "lucide-react";
import { BurgerBtn } from "./UI/BurgerBtn";
import { useState } from "react";
import { Drawer } from "./UI/Drawer";

export function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
      <BurgerBtn
        isOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </nav>
  );
}
