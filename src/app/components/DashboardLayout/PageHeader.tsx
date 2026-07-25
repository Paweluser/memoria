type PageHeaderProps = {
	title: string;
	description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<header className="mb-8 text-center">
			<h2 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
				{title}
			</h2>
			{description && <p className="mt-2">{description}</p>}
		</header>
	);
}