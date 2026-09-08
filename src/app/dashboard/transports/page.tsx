import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { Pagination } from "@/app/components/Pagination";
import { TransportTable } from "@/app/components/Tables/TransportTable";
import { getTransportOrders } from "@/db/queries/transport";

type TransportsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function TransportsPage({ searchParams }: TransportsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const { data, totalPages } = await getTransportOrders(currentPage);

  return (
    <>
      <PageHeader
        title="Przewozy"
        description="Zbiór wszystkich aktualnych przewozów."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/transports/new">Dodaj</AppLink>
      </div>
      <TransportTable data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
