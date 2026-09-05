import { db } from "@/db";
import { employees } from "../schema";

export async function getEmployeeList() {
    return await db.select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName
    }).from(employees)
}