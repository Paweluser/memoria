import { EmployeeTableData } from "@/types/employeeTypes";
import { RemoveEmployeeForm } from "@/app/components/Form/RemoveEmployeeForm";
import Link from "next/link";
import { Pencil } from "lucide-react";

type EmployeeTableProps = {
  data: EmployeeTableData;
  teamId?: number;
  canEdit?: boolean;
};

export function EmployeeTable({
  data,
  teamId,
  canEdit = false,
}: EmployeeTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Imię</th>
            <th className="px-3 py-2">Nazwisko</th>
            <th className="px-3 py-2">Adres e-mail</th>
            <th className="px-3 py-2">Rola</th>
            {canEdit && <th className="px-3 py-2">Edycja</th>}
            {teamId !== undefined && (
              <th className="px-3 py-2">Wypisanie z zespołu</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--table-border)">
          {data.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-(--table-border) last:border-0 [&>td]:px-4 [&>td]:py-3"
            >
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td className="capitalize">{employee.role}</td>
              {canEdit && (
                <td>
                  <Link
                    href={`/dashboard/employees/${employee.id}/edit`}
                    className="inline-flex rounded p-1 hover:text-(--accent-color)"
                  >
                    <Pencil className="size-5" aria-hidden="true" />
                  </Link>
                </td>
              )}
              {teamId !== undefined && (
                <td>
                  <RemoveEmployeeForm
                    teamId={teamId}
                    employeeId={employee.id}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
