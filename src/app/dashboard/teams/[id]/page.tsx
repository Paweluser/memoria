import { notFound } from "next/navigation";
import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeTable } from "@/app/components/Tables/EmployeeTable";
import { AssignEmployeeForm } from "@/app/components/Form/AssignEmployeeForm";
import { getTeamDetails } from "@/db/queries/team";
import { getEmployeeList } from "@/db/queries/employee";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

type TeamDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeamDetailsPage({
  params,
}: TeamDetailsPageProps) {
  const session = await requireUser();
  const canEditTeam = await hasRole(session.userId, ["ADMIN"]);

  const { id } = await params;
  const teamId = Number(id);

  const team = await getTeamDetails(teamId);

  if (!team) {
    notFound();
  }

  const availableEmployees = canEditTeam
    ? await getEmployeeList({ withoutTeam: true })
    : [];

  return (
    <>
      <PageHeader
        title={team.teamName}
        description={`Liczba pracowników: ${team.employees.length}`}
      />

      <div className="flex flex-wrap justify-center gap-4">
        <AppLink href="/dashboard/teams">
          Wróć do listy zespołów
        </AppLink>
        {canEditTeam && (
          <AppLink href={`/dashboard/teams/${team.id}/edit`}>
            Edytuj
          </AppLink>
        )}
      </div>

      {team.employees.length > 0 ? (
        <EmployeeTable
          data={team.employees}
          teamId={canEditTeam ? team.id : undefined}
          canEdit={canEditTeam}
        />
      ) : (
        <p className="mt-8 text-center">
          Ten zespół nie ma jeszcze przypisanych pracowników.
        </p>
      )}
      {canEditTeam && (
        <AssignEmployeeForm
          teamId={team.id}
          employees={availableEmployees}
        />
      )}
    </>
  );
}
