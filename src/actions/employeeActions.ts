"use server";

import { db } from "@/db";
import { employees } from "@/db/schema";
import { employeeSchema } from "@/db/validations/employeeSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { getTeamById } from "@/db/queries/team";
import { revalidatePath } from "next/cache";
import z from "zod";

type EmployeeFormState = {
  errors: z.inferFlattenedErrors<typeof employeeSchema>["fieldErrors"] & {
    general?: string[];
  };
};

export async function createEmployeeAction(
  prevState: EmployeeFormState,
  formData: FormData,
): Promise<EmployeeFormState> {
  const session = await requireUser();

  try {
    const canCreateEmployee = await hasRole(session.userId, ["ADMIN"]);

    if (!canCreateEmployee) {
      return {
        errors: {
          general: ["Nie masz uprawnień do dodawania pracowników."],
        },
      };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = employeeSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { firstName, lastName, email, password, role, teamId } =
      validatedFields.data;

    if (teamId !== null && !(await getTeamById(teamId))) {
      return {
        errors: {
          teamId: ["Wybrany zespół już nie istnieje. Wybierz inny zespół."],
        },
      };
    }

    const existingUser = await db.query.employees.findFirst({
      where: eq(employees.email, email),
      columns: {
        id: true,
      },
    });

    if (existingUser) {
      return {
        errors: {
          email: ["Konto z tym adresem e-mail już istnieje."],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(employees).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      teamId,
    });
  } catch (error) {
    console.error("Błąd podczas dodawania pracownika:", error);

    return {
      errors: {
        general: ["Wystąpił błąd serwera podczas zapisywania."],
      },
    };
  }

  revalidatePath("/dashboard/employees");
  revalidatePath("/dashboard/teams");
  redirect("/dashboard/employees");
}
