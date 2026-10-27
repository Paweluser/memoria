import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeForm } from "@/app/components/Form/EmployeeForm";
import { AppLink } from "@/app/components/AppLink";
import { getTeamList } from "@/db/queries/team";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

export default async function NewEmployeePage() {
  const session = await requireUser();
  const canCreateEmployee = await hasRole(session.userId, ["ADMIN"]);

  if (!canCreateEmployee) {
    return (
      <>
        <PageHeader title="Brak dostępu" />

        <p className="mb-4">
          Nie masz uprawnień do dodawania pracowników.
        </p>

        <AppLink href="/dashboard/employees">
          Wróć do listy pracowników
        </AppLink>
      </>
    );
  }

  const teams = await getTeamList();

  return (
    <>
      <PageHeader title="Nowy pracownik" />
      <EmployeeForm teams={teams} />
    </>
  );
}
