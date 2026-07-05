type AuthWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export function AuthWrapper({
  children,
  title,
  description,
}: AuthWrapperProps) {
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h2 className="mb-2 font-(family-name:--julius) text-3xl font-bold uppercase md:mb-4 md:text-5xl">
        {title}
      </h2>
      <p className="md:text-xl">{description}</p>
      {children}
    </div>
  );
}
