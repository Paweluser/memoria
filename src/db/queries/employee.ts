import { db } from "@/db";
import { employees } from "../schema";
import { count } from "drizzle-orm";

export async function getEmployeeList() {
    return await db.select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName
    }).from(employees)
}

export async function getEmployees(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  const data = await db.query.employees.findMany({
    limit: pageSize,
    offset: offset,
    orderBy: (employees, { desc }) => [desc(employees.id)],
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });

  const totalRecords = await db.select({ value: count() }).from(employees);
  const totalCount = totalRecords[0].value;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}