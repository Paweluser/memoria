import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TransportForm } from "@/app/components/Form/TransportForm";
import { getEmployeeList } from "@/db/queries/employee";

export default async function NewTransportPage() {
  const employee = await getEmployeeList();

  return (
    <>
      <PageHeader title="Nowy transport" />
      <TransportForm employees={employee} />
    </>
  );
}
