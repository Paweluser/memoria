"use client";

import { NavLinks } from "@/constants/NavLinks";
import NavLink from "./NavLink";

export function NavLinkList({ onClick }: { onClick?: () => void }) {
  return (
    <ul className="space-y-6 p-3 md:space-y-7 lg:p-4">
      {NavLinks.map((group) => (
        <li key={group.title}>
          <p className="mb-2 px-2 font-bold uppercase">{group.title}</p>
          {group.links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              Icon={link.icon}
              onClick={onClick}
            />
          ))}
        </li>
      ))}
    </ul>
  );
}
