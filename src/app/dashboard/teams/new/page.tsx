import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TeamForm } from "@/app/components/Form/TeamForm";
import { AppLink } from "@/app/components/AppLink";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

export default async function NewTeamPage() {
  const session = await requireUser();
  const canCreateTeam = await hasRole(session.userId, ["ADMIN"]);

  if (!canCreateTeam) {
    return (
      <>
        <PageHeader title="Brak dostępu" />

        <p className="mb-4">
          Nie masz uprawnień do dodawania zespołów.
        </p>

        <AppLink href="/dashboard/teams">
          Wróć do listy zespołów
        </AppLink>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Nowy zespół" />
      <TeamForm />
    </>
  );
}
