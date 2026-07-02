import Link from 'next/link';
import { ReactNode } from 'react';

type AppLinkProps = {
	href: string;
	children: ReactNode;
}

export function AppLink({ href, children }: AppLinkProps) {
	return (
		<Link
			href={href}
			className="px-8 py-3 rounded-lg transition-colors duration-300 bg-(--second-color) text-(--main-color) hover:bg-(--accent-color)">
			{children}
		</Link>
	);
}