"use server";

import { db } from "@/db";
import { createSession, deleteSession } from "@/db/session";
import { employees } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signup(prevState: unknown, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: Record<string, string> = {};

  if (!firstName || firstName.trim() === "")
    errors.firstName = "Imię jest wymagane.";
  if (!lastName || lastName.trim() === "")
    errors.lastName = "Nazwisko jest wymagane.";
  if (!email || !email.includes("@"))
    errors.email = "Niepoprawny adres e-mail.";
  if (!password || password.trim().length < 8)
    errors.password = "Hasło musi mieć co najmniej 8 znaków.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const existingUser = await db.query.employees.findFirst({
      where: eq(employees.email, email),
    });

    if (existingUser) {
      return { errors: { email: "Konto z tym adresem e-mail już istnieje." } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db.insert(employees).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).returning({
      id: employees.id,
      role: employees.role
    });

    if (!newUser) {
      return {
        errors: { general: "Wystąpił błąd podczas tworzenia konta." },
      };
    }

    await createSession(newUser.id, newUser.role);

  } catch {
    return {
      errors: { general: "Wystąpił błąd podczas zapisywania." },
    };
  }
  redirect('/dashboard');
}

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