import { notFound } from "next/navigation";
import { AccessDenied } from "@/app/components/AccessDenied";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TransportForm } from "@/app/components/Form/TransportForm";
import { getTransportById } from "@/db/queries/transport";
import { getEmployeeList } from "@/db/queries/employee";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

type EditTransportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTransportPage({ params }: EditTransportPageProps) {
  const session = await requireUser();
  const canEditTransport = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

  if (!canEditTransport) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do edytowania przewozów."
        backHref="/dashboard/transports"
        backLabel="Wróć do listy przewozów"
      />
    );
  }

  const { id } = await params;
  const transport = await getTransportById(Number(id));

  if (!transport) {
    notFound();
  }

  const employees = await getEmployeeList();

  return (
    <>
      <PageHeader title="Edytuj przewóz" />
      <TransportForm transport={transport} employees={employees} />
    </>
  );
}
