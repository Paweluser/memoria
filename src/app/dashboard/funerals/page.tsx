import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { Pagination } from "@/app/components/Pagination";
import { CeremonyTable } from "@/app/components/Tables/CeremonyTable";
import { getCeremonies } from "@/db/queries/ceremony";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

type FuneralsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function FuneralsPage({ searchParams }: FuneralsPageProps) {
  const session = await requireUser();
  const canCreateFuneral = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const { data, totalPages } = await getCeremonies(currentPage);

  return (
    <>
      <PageHeader
        title="Pogrzeby"
        description="Zbiór wszystkich pogrzebów oraz opcja dodawania nowych pogrzebów."
      />
      {canCreateFuneral && (
        <div className="flex justify-center">
          <AppLink href="/dashboard/funerals/new">Dodaj</AppLink>
        </div>
      )}
      <CeremonyTable data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
