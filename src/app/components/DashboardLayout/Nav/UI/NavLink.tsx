'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type NavLinkProps = {
	href: string;
	label: string;
	icon: ReactNode;
	onClick?: () => void;
};

export default function NavLink({
	href,
	label,
	icon,
	onClick,
}: NavLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			onClick={onClick}
			className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 ${
				isActive
					? 'bg-(--second-color) text-(--main-color)'
					: 'hover:text-(--accent-color)'
			}`}>
			{icon}
			<span>{label}</span>
		</Link>
	);
}