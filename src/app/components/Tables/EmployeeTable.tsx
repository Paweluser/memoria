import { EmployeeTableData } from "@/types/employeeTypes";
import { RemoveEmployeeForm } from "@/app/components/Form/RemoveEmployeeForm";

type EmployeeTableProps = {
  data: EmployeeTableData;
  teamId?: number;
};

export function EmployeeTable({ data, teamId }: EmployeeTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Imię</th>
            <th className="px-3 py-2">Nazwisko</th>
            <th className="px-3 py-2">Adres e-mail</th>
            <th className="px-3 py-2">Rola</th>
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
