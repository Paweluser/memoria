export type EmployeeRole = "ADMIN" | "EMPLOYEE" | "MANAGER" | string;

export type EmployeeData = {
  id: number;
  teamId?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: EmployeeRole;
};

export type SimpleEmployee = Pick<EmployeeData, "id" | "firstName" | "lastName">;

export type EmployeeTableItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRole;
  teamName?: string | null;
};

export type EmployeeTableData = EmployeeTableItem[];