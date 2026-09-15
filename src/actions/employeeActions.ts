"use server";

import { db } from "@/db";
import { employees } from "@/db/schema";
import { employeeSchema } from "@/db/validations/employeeSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

type EmployeeFormState = {
  errors: z.inferFlattenedErrors<typeof employeeSchema>["fieldErrors"] & {
    general?: string[];
  };
};

export async function createEmployeeAction(
  prevState: EmployeeFormState,
  formData: FormData
): Promise<EmployeeFormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = employeeSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, password, role } = validatedFields.data;

  const existingUser = await db.query.employees.findFirst({
    where: eq(employees.email, email),
  });

  if (existingUser) {
    return { errors: { email: ["Konto z tym adresem e-mail już istnieje."] } };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(employees).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
  } catch (error) {
    console.error("Błąd podczas dodawania pracownika:", error);
    return {
      errors: { general: ["Wystąpił błąd serwera podczas zapisywania."] },
    };
  }

  redirect("/dashboard/employees");
}