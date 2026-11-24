export type MonthlyCeremonyStatistics = {
  month: number;
  monthName: string;
  total: number;
  coffin: number;
  urn: number;
};

export type CeremonyStatisticsTotals = Pick<
  MonthlyCeremonyStatistics,
  "total" | "coffin" | "urn"
>;
