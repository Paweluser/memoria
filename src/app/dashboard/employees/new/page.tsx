import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeForm } from "@/app/components/Form/EmployeeForm";

export default function NewEmployeePage() {
  return (
    <>
      <PageHeader title="Nowy pracownik" />
      <EmployeeForm />
    </>
  );
}
