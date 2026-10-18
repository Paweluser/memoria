import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeForm } from "@/app/components/Form/EmployeeForm";
import { getTeamList } from "@/db/queries/team";

export default async function NewEmployeePage() {
  const teams = await getTeamList();

  return (
    <>
      <PageHeader title="Nowy pracownik" />
      <EmployeeForm teams={teams} />
    </>
  );
}
