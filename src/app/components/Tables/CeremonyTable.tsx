import { CeremonyTableData } from "@/types/funeralsTypes";

type CeremonyTableProps = {
  data: CeremonyTableData;
}

export function CeremonyTable({ data }: CeremonyTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Zleceniodawca</th>
            <th className="px-3 py-2">Zmarły</th>
            <th className="px-3 py-2">Zespół</th>
            <th className="px-3 py-2">Miasto</th>
            <th className="px-3 py-2">Data ceremonii</th>
            <th className="px-3 py-2">Godzina ceremonii</th>
            <th className="px-3 py-2">Wprowadzenie</th>
            <th className="px-3 py-2">Pożegnanie</th>
            <th className="px-3 py-2">Rodzaj pochówku</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ceremony) => (
            <tr
              key={ceremony.id}
              className="border-b border-(--table-border) last:border-0 [&>td]:px-4 [&>td]:py-3"
            >
              <td>
                {ceremony.client?.firstName} {ceremony.client?.lastName}
              </td>
              <td>
                {ceremony.deceased?.firstName} {ceremony.deceased?.lastName}
              </td>
              <td>{ceremony.team?.teamName || "Brak zespołu"}</td>
              <td>{ceremony.city}</td>
              <td>{ceremony.funeralDate}</td>
              <td>{ceremony.funeralTime}</td>
              <td>{ceremony.bringingInTime}</td>
              <td>{ceremony.gatheringTime}</td>
              <td>{ceremony.burialType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
