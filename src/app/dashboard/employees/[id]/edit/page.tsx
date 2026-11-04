import { notFound } from "next/navigation";
import { AccessDenied } from "@/app/components/AccessDenied";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { EmployeeForm } from "@/app/components/Form/EmployeeForm";
import { getEmployeeById } from "@/db/queries/employee";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";

type EditEmployeePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEmployeePage({ params }: EditEmployeePageProps) {
  const session = await requireUser();
  const canEditEmployee = await hasRole(session.userId, ["ADMIN"]);

  if (!canEditEmployee) {
    return (
      <AccessDenied
        message="Nie masz uprawnień do edytowania pracowników."
        backHref="/dashboard/employees"
        backLabel="Wróć do listy pracowników"
      />
    );
  }

  const { id } = await params;
  const employee = await getEmployeeById(Number(id));

  if (!employee) {
    notFound();
  }

  return (
    <>
      <PageHeader title="Edytuj pracownika" />
      <EmployeeForm employee={employee} teams={[]} />
    </>
  );
}
