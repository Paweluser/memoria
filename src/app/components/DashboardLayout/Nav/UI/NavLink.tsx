"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
};

export default function NavLink({ href, label, Icon, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300 ${
        isActive
          ? "bg-(--second-color) text-(--main-color)"
          : "hover:text-(--accent-color)"
      }`}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
}
