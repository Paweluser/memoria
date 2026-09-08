import { TransportTableData } from "@/types/transportsTypes";

type TransportTableProps = {
  data: TransportTableData;
};

export function TransportTable({ data }: TransportTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Miejsce odbioru</th>
            <th className="px-3 py-2">Miejsce docelowe</th>
            <th className="px-3 py-2">Telefon klienta</th>
            <th className="px-3 py-2">Osoba zlecająca</th>
            <th className="px-3 py-2">Przypisany pracownik</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transport) => (
            <tr
              key={transport.id}
              className="border-b border-(--table-border) last:border-0 [&>td]:px-4 [&>td]:py-3"
            >
              <td>{transport.transportFrom}</td>
              <td>{transport.transportTo}</td>
              <td>{transport.clientPhoneNumber}</td>
              <td>
                {transport.manager
                  ? `${transport.manager.firstName} ${transport.manager.lastName}`
                  : "Brak"}
              </td>
              <td>
                {transport.employee
                  ? `${transport.employee.firstName} ${transport.employee.lastName}`
                  : "Brak"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}