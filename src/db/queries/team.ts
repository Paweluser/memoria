import { asc, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { teams } from "@/db/schema";

export async function getTeamList() {
  return db
    .select({ id: teams.id, teamName: teams.teamName })
    .from(teams)
    .orderBy(asc(teams.teamName), asc(teams.id));
}

export async function getTeamById(id: number) {
  return db.query.teams.findFirst({
    where: eq(teams.id, id),
    columns: {
      id: true,
      teamName: true,
    },
  });
}

export async function getTeamDetails(id: number) {
  return db.query.teams.findFirst({
    where: eq(teams.id, id),
    columns: {
      id: true,
      teamName: true,
    },
    with: {
      employees: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
        orderBy: (employees, { asc }) => [
          asc(employees.lastName),
          asc(employees.firstName),
          asc(employees.id),
        ],
      },
    },
  });
}

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
