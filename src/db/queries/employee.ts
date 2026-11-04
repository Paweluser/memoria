import { db } from "@/db";
import { employees } from "../schema";
import { and, asc, count, eq, isNull } from "drizzle-orm";
import type { EmployeeData } from "@/types/employeeTypes";

export async function getEmployeeById(id: number) {
  return db.query.employees.findFirst({
    where: eq(employees.id, id),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
}

export async function getEmployeeByEmail(email: string) {
  return db.query.employees.findFirst({
    where: eq(employees.email, email),
    columns: {
      id: true,
    },
  });
}

export async function updateEmployee(
  id: number,
  data: Pick<EmployeeData, "firstName" | "lastName" | "email">,
) {
  return db
    .update(employees)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    })
    .where(eq(employees.id, id))
    .returning({
      id: employees.id,
      teamId: employees.teamId,
    });
}

type EmployeeListOptions = {
  withoutTeam?: boolean;
};

export async function getEmployeeList({
  withoutTeam = false,
}: EmployeeListOptions = {}) {
  return db
    .select({
      id: employees.id,
      firstName: employees.firstName,
      lastName: employees.lastName,
    })
    .from(employees)
    .where(withoutTeam ? isNull(employees.teamId) : undefined)
    .orderBy(
      asc(employees.lastName),
      asc(employees.firstName),
      asc(employees.id),
    );
}

export async function assignEmployeeToTeam(
  employeeId: number,
  teamId: number,
) {
  return db
    .update(employees)
    .set({ teamId })
    .where(
      and(
        eq(employees.id, employeeId),
        isNull(employees.teamId),
      ),
    )
    .returning({ id: employees.id });
}

export async function removeEmployeeFromTeam(
  employeeId: number,
  teamId: number,
) {
  return db
    .update(employees)
    .set({ teamId: null })
    .where(
      and(
        eq(employees.id, employeeId),
        eq(employees.teamId, teamId),
      ),
    )
    .returning({ id: employees.id });
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

export async function getEmployeeAccessById(id: number) {
  return db.query.employees.findFirst({
    where: eq(employees.id, id),
    columns: {
      id: true,
      role: true,
    },
  });
}
