import { TeamTableData } from "@/types/teamTypes";
import Link from "next/link";
import { Eye } from "lucide-react";

type TeamTableProps = {
  data: TeamTableData;
};

export function TeamTable({ data }: TeamTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-(--table-border) shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap lg:text-base">
        <thead className="border-b border-(--table-border) bg-(--table-header-bg)">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="px-3 py-2">Nazwa zespołu</th>
            <th className="px-3 py-2">Liczba pracowników</th>
            <th className="px-3 py-2">Szczegóły</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-(--table-border)">
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center">
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
                <td>
                  <Link
                    href={`/dashboard/teams/${team.id}`}
                    className="inline-flex rounded p-1 hover:text-(--accent-color)"
                  >
                    <Eye className="size-5" />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
