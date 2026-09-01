export type EmployeeData = {
  id: number;
  teamId?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
  role: string;
};

export type SimpleEmployee = Pick<EmployeeData, "id" | "firstName" | "lastName">;