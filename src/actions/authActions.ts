"use server";

import { db } from "@/db";
import { createSession, deleteSession } from "@/db/session";
import { employees } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { errors: { general: "Wypełnij e-mail i hasło." } }
  }

  try {
    const user = await db.query.employees.findFirst({
      where: eq(employees.email, email)
    })

    if (!user) {
      return { errors: { general: "Błędny adres e-mail lub hasło." } }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { errors: { general: "Błędny adres e-mail lub hasło" } }
    }

    await createSession(user.id, user.role);
    
  } catch {
    return { errors: { general: "Wystąpił błąd podczas logowania." } }
  }
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
