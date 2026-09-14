import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { Pagination } from "@/app/components/Pagination";
import { EmployeeTable } from "@/app/components/Tables/EmployeeTable";
import { getEmployees } from "@/db/queries/employee";

type EmployeesPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function EmployeesPage({
  searchParams,
}: EmployeesPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const { data, totalPages } = await getEmployees(currentPage);

  return (
    <>
      <PageHeader
        title="Pracownicy"
        description="Lista wszystkich pracowników w zakładzie."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/employees/new">Dodaj</AppLink>
      </div>
      <EmployeeTable data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
