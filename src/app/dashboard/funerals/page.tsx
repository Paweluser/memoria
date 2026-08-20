import { AppLink } from "@/app/components/AppLink";
import PageHeader from "@/app/components/DashboardLayout/PageHeader";
import { CeremonyTable } from "@/app/components/Tables/CeremonyTable";
import { getCeremonies } from "@/db/queries/ceremony";
import { CeremonyTableData } from "@/types/funeralsTypes";

export default async function FuneralsPage() {
  const ceremonies = await getCeremonies();

  return (
    <>
      <PageHeader
        title="Pogrzeby"
        description="Zbiór wszystkich pogrzebów oraz opcja dodawania nowych pogrzebów."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/funerals/new">Dodaj</AppLink>
      </div>
      <CeremonyTable data={ceremonies as CeremonyTableData} />
    </>
  );
}
