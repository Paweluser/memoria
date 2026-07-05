import { Flame } from "lucide-react";
import { AppLink } from "./components/AppLink";

export default function Home() {
  return (
    <main className="m-auto flex flex-col items-center justify-center">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="font-(family-name:--julius) text-5xl font-bold tracking-widest md:text-7xl">
          MEMOR
          <span className="relative inline-block">
            I
            <Flame className="absolute -top-6 left-1/2 size-6 translate-x-[-60%] text-(--accent-color) md:-top-8 md:size-9" />
          </span>
          A
        </h1>
        <h2 className="text-md font-medium md:text-xl">
          Aplikacja do zarządzania zakładem pogrzebowym
        </h2>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 mt-8">
        <AppLink href="/login">Zaloguj się</AppLink>
        <p className="">Nie posiadasz konta?</p>
				<AppLink href="/register">Załóż konto</AppLink>
      </div>
    </main>
  );
}
