type ProgressBarProps = {
  step: number;
};

export function ProgressBar({ step }: ProgressBarProps) {
  const percentage = (step / 3) * 100;

  return (
    <div>
      <p className="mb-4 text-center text-xl">
        Postęp przebiegu dodawania ceremonii
      </p>
      <div className="relative m-2 flex items-center justify-between overflow-hidden rounded-4xl border border-(--second-color) p-3 px-6 text-sm font-medium">
        <div
          className="absolute top-0 left-0 h-full bg-(--table-border) transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <p className="relative z-10">Zmarły</p>
        <p className="relative z-10">Zleceniodawca</p>
        <p className="relative z-10">Ceremonia</p>
      </div>

      <p className="mt-2 mr-5 text-center md:mt-4">Krok {step} z 3</p>
    </div>
  );
}
