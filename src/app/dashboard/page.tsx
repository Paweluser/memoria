import Link from "next/link";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { DashboardCard } from "@/app/components/DashboardCard";
import { AppLink } from "@/app/components/AppLink";
import { getCeremoniesDashboardData } from "@/db/queries/ceremony";
import { requireUser } from "@/db/session";
import { formatDate } from "@/utils/formatDate";
import { dashboardCards } from "@/constants/dashboardCards";

export default async function DashboardPage() {
  await requireUser();

  const data = await getCeremoniesDashboardData();
  const { upcomingCeremonies } = data;

  return (
    <>
      <PageHeader
        title="Panel główny"
        description="Plan ceremonii i najważniejsze informacje na najbliższe dni."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.key}
            title={card.title}
            value={data[card.key]}
          />
        ))}
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-medium">Najbliższe pogrzeby</h3>
        <p className="mt-2 text-sm">
          Dzisiejsze i nadchodzące ceremonie. Kliknij po szczegóły.
        </p>

        {upcomingCeremonies.length > 0 ? (
          <ul className="mt-4 divide-y divide-(--table-border) overflow-hidden rounded-lg border border-(--table-border)">
            {upcomingCeremonies.map((ceremony) => (
              <li key={ceremony.id}>
                <Link
                  href={`/dashboard/funerals/${ceremony.id}`}
                  className="block px-4 py-4 transition-colors hover:bg-(--table-header-bg) focus-visible:bg-(--table-header-bg)"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 font-medium wrap-break-word">
                      {ceremony.deceased
                        ? `${ceremony.deceased.firstName} ${ceremony.deceased.lastName}`
                        : "Brak danych zmarłego"}
                    </p>
                    <p className="text-sm">
                      {formatDate(ceremony.funeralDate)}
                      {" · "}
                      {ceremony.funeralTime?.slice(0, 5) || "Godzina nieustalona"}
                    </p>
                  </div>
                  <p className="mt-2 text-sm">
                    {ceremony.city}
                    {" · "}
                    {ceremony.team?.teamName || "Brak zespołu"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-lg border border-(--table-border) p-6 text-center">
            Brak dzisiejszych i nadchodzących pogrzebów.
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <AppLink href="/dashboard/funerals">Wszystkie pogrzeby</AppLink>
        </div>
      </section>
    </>
  );
}
