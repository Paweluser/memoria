import { notFound } from "next/navigation";
import { AccessDenied } from "@/app/components/AccessDenied";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TeamForm } from "@/app/components/Form/TeamForm";
import { getTeamById } from "@/db/queries/team";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

type EditTeamPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamPage({ params }: EditTeamPageProps) {
  const session = await requireUser();
  const canEditTeam = await hasRole(session.userId, ["ADMIN"]);

  if (!canEditTeam) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do edytowania zespołów."
        backHref="/dashboard/teams"
        backLabel="Wróć do listy zespołów"
      />
    );
  }

  const { id } = await params;
  const team = await getTeamById(Number(id));

  if (!team) {
    notFound();
  }

  return (
    <>
      <PageHeader title="Edytuj zespół" />
      <TeamForm team={team} />
    </>
  );
}
