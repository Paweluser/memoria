import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";

export default function EmployeesPage() {
  return (
    <>
      <PageHeader
        title="Pracownicy"
        description="Lista wszystkich pracowników w zakładzie."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/employees/new">Dodaj</AppLink>
      </div>
    </>
  );
}
