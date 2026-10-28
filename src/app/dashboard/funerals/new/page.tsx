
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { FuneralWizard } from "@/app/components/FuneralWizard";
import { AccessDenied } from "@/app/components/AccessDenied";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

export default async function NewFuneralPage() {
  const session = await requireUser();
  const canCreateFuneral = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

  if (!canCreateFuneral) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do dodawania pogrzebów."
        backHref="/dashboard/funerals"
        backLabel="Wróć do listy pogrzebów"
      />
    );
  }

  return (
    <>
      <PageHeader title="Nowy pogrzeb" />
      <FuneralWizard />
    </>
  );
}
