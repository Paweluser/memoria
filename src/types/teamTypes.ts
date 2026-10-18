export type TeamTableItem = {
  id: number;
  teamName: string;
  membersCount: number;
};

export type TeamTableData = TeamTableItem[];

export type SimpleTeam = Pick<TeamTableItem, "id" | "teamName">;
