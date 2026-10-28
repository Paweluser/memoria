import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeForm } from "@/app/components/Form/EmployeeForm";
import { AccessDenied } from "@/app/components/AccessDenied";
import { getTeamList } from "@/db/queries/team";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

export default async function NewEmployeePage() {
  const session = await requireUser();
  const canCreateEmployee = await hasRole(session.userId, ["ADMIN"]);

  if (!canCreateEmployee) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do dodawania pracowników."
        backHref="/dashboard/employees"
        backLabel="Wróć do listy pracowników"
      />
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
