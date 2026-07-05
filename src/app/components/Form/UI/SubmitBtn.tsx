type SubmitBtnProps = {
  children: React.ReactNode;
};

export function SubmitBtn({ children }: SubmitBtnProps) {
  return (
    <button
      type="submit"
      className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
    >
      {children}
    </button>
  );
}
