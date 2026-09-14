import { EmployeeTableData } from "@/types/employeeTypes";

type EmployeeTableProps = {
  data: EmployeeTableData;
};

export function EmployeeTable({ data }: EmployeeTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Imię</th>
            <th className="px-3 py-2">Nazwisko</th>
            <th className="px-3 py-2">Adres e-mail</th>
            <th className="px-3 py-2">Rola</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}