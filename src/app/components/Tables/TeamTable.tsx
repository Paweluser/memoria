import { TeamTableData } from "@/types/teamTypes";

type TeamTableProps = {
  data: TeamTableData;
};

export function TeamTable({ data }: TeamTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th scope="col">Nazwa zespołu</th>
            <th scope="col">Liczba pracowników</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-(--table-border)">
          {data.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center">
                Brak zespołów do wyświetlenia.
              </td>
            </tr>
          ) : (
            data.map((team) => (
              <tr
                key={team.id}
                className="[&>td]:px-4 [&>td]:py-3"
              >
                <td>{team.teamName}</td>
                <td>{team.membersCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}