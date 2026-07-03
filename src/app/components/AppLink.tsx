import Link from "next/link";
import { ReactNode } from "react";

type AppLinkProps = {
  href: string;
  children: ReactNode;
};

export function AppLink({ href, children }: AppLinkProps) {
  return (
    <Link
      href={href}
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
    >
      {children}
    </Link>
  );
}
