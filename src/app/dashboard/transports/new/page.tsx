import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TransportForm } from "@/app/components/Form/TransportForm";
import { AccessDenied } from "@/app/components/AccessDenied";
import { getEmployeeList } from "@/db/queries/employee";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

export default async function NewTransportPage() {
  const session = await requireUser();
  const canCreateTransport = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

  if (!canCreateTransport) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do dodawania przewozów."
        backHref="/dashboard/transports"
        backLabel="Wróć do listy przewozów"
      />
    );
  }

  const employee = await getEmployeeList();

  return (
    <>
      <PageHeader title="Nowy transport" />
      <TransportForm employees={employee} />
    </>
  );
}
