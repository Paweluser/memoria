import { count } from "drizzle-orm";
import { db } from "@/db";
import { teams } from "@/db/schema";

export async function getTeamsTableData(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  const data = await db.query.teams.findMany({
    limit: pageSize,
    offset: offset,
    orderBy: (teams, { desc }) => [desc(teams.id)],
    with: {
      employees: {
        columns: {
          id: true, 
        },
      },
    },
  });

  const formattedData = data.map((team) => ({
    id: team.id,
    teamName: team.teamName,
    membersCount: team.employees.length,
  }));

  const totalRecords = await db.select({ value: count() }).from(teams);
  const totalCount = totalRecords[0].value;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { data: formattedData, totalPages };
}