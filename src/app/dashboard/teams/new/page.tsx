import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TeamForm } from "@/app/components/Form/TeamForm";
import { AccessDenied } from "@/app/components/AccessDenied";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { getEmployeeList } from "@/db/queries/employee";

export default async function NewTeamPage() {
  const session = await requireUser();
  const canCreateTeam = await hasRole(session.userId, ["ADMIN"]);

  if (!canCreateTeam) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do dodawania zespołów."
        backHref="/dashboard/teams"
        backLabel="Wróć do listy zespołów"
      />
    );
  }

  const employees = await getEmployeeList({ withoutTeam: true });

  return (
    <>
      <PageHeader title="Nowy zespół" />
      <TeamForm employees={employees} />
    </>
  );
}
