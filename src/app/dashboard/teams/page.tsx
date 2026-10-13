import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { Pagination } from "@/app/components/Pagination";
import { TeamTable } from "@/app/components/Tables/TeamTable";
import { getTeamsTableData } from "@/db/queries/team";

type TeamsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function TeamsPage({
  searchParams,
}: TeamsPageProps) {
  const { page } = await searchParams;
  const parsedPage = Number(page);

  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const { data, totalPages } = await getTeamsTableData(currentPage);

  return (
    <>
      <PageHeader
        title="Zespoły"
        description="Lista zespołów oraz możliwość dodawania nowych."
      />

      <div className="flex justify-center">
        <AppLink href="/dashboard/teams/new">Dodaj</AppLink>
      </div>

      <TeamTable data={data} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
