import { notFound } from "next/navigation";
import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeTable } from "@/app/components/Tables/EmployeeTable";
import { getTeamDetails } from "@/db/queries/team";
import { requireUser } from "@/db/session";

type TeamDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeamDetailsPage({
  params,
}: TeamDetailsPageProps) {
  await requireUser();

  const { id } = await params;
  const teamId = Number(id);

  const team = await getTeamDetails(teamId);

  if (!team) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={team.teamName}
        description={`Liczba pracowników: ${team.employees.length}`}
      />

      <div className="flex justify-center">
        <AppLink href="/dashboard/teams">
          Wróć do listy zespołów
        </AppLink>
      </div>

      {team.employees.length > 0 ? (
        <EmployeeTable data={team.employees} />
      ) : (
        <p className="mt-8 text-center">
          Ten zespół nie ma jeszcze przypisanych pracowników.
        </p>
      )}
    </>
  );
}
