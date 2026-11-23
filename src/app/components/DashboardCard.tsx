type DashboardCardProps = {
  title: string;
  value: number;
};

export function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="rounded-lg border border-(--table-border) bg-(--table-header-bg) p-5">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}
