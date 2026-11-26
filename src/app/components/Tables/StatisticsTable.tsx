import type {
  CeremonyStatisticsTotals,
  MonthlyCeremonyStatistics,
} from "@/types/statisticsTypes";

type StatisticsTableProps = {
  data: MonthlyCeremonyStatistics[];
  totals: CeremonyStatisticsTotals;
};

export function StatisticsTable({ data, totals }: StatisticsTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th>Miesiąc</th>
            <th className="text-right">Wszystkie ceremonie</th>
            <th className="text-right">Trumna</th>
            <th className="text-right">Urna</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-(--table-border)">
          {data.map((month) => (
            <tr key={month.month} className="[&>td]:px-4 [&>td]:py-3">
              <td>{month.monthName}</td>
              <td className="text-right tabular-nums">{month.total}</td>
              <td className="text-right tabular-nums">{month.coffin}</td>
              <td className="text-right tabular-nums">{month.urn}</td>
            </tr>
          ))}
        </tbody>

        <tfoot className="border-t border-(--table-border) bg-(--table-header-bg) font-semibold">
          <tr className="[&>td]:px-4 [&>td]:py-3">
            <td>Razem</td>
            <td className="text-right tabular-nums">{totals.total}</td>
            <td className="text-right tabular-nums">{totals.coffin}</td>
            <td className="text-right tabular-nums">{totals.urn}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
