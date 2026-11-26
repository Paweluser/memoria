import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { StatisticsTable } from "@/app/components/Tables/StatisticsTable";
import {
  getCeremonyStatistics,
  getCeremonyYears,
} from "@/db/queries/ceremony";
import { requireUser } from "@/db/session";

type StatisticsPageProps = {
  searchParams: Promise<{ year?: string | string[] }>;
};

export default async function StatisticsPage({ searchParams }: StatisticsPageProps) {
  await requireUser();

  const { year } = await searchParams;
  const currentYear = Number(
    new Intl.DateTimeFormat("en", {
      timeZone: "Europe/Warsaw",
      year: "numeric",
    }).format(new Date()),
  );
  const ceremonyYears = await getCeremonyYears();
  const years = [...new Set([currentYear, ...ceremonyYears])].sort((a, b) => b - a);
  const requestedYear = typeof year === "string" ? Number(year) : currentYear;
  const selectedYear = years.includes(requestedYear) ? requestedYear : currentYear;
  const { data, totals } = await getCeremonyStatistics(selectedYear);

  return (
    <>
      <PageHeader
        title="Statystyki"
        description="Liczba ceremonii według miesiąca i rodzaju pochówku. Zestawienie uwzględnia również zaplanowane pogrzeby."
      />

      <form
        action="/dashboard/statistics"
        method="get"
        className="flex flex-wrap items-end justify-center gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="year">Rok</label>
          <select
            key={selectedYear}
            id="year"
            name="year"
            defaultValue={selectedYear}
            className="rounded-lg border border-(--second-color) bg-(--main-color) px-4 py-3"
          >
            {years.map((availableYear) => (
              <option key={availableYear} value={availableYear}>
                {availableYear}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
        >
          Pokaż
        </button>
      </form>

      <h3 className="mt-8 text-xl font-medium">Ceremonie w roku {selectedYear}</h3>
      <StatisticsTable data={data} totals={totals} />
    </>
  );
}
