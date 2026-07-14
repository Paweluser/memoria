"use server";

import { db } from "@/db";
import { createSession, deleteSession } from "@/db/lib/session";
import { employees } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

if (!process.env.JWT_SECRET) {
    throw new Error("Brak zmiennej jwt!");
}

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

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

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const token = await new SignJWT({
      userId: user.id,
      role: user.role
    }).setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey)

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: "lax",
      path: "/"
    });
  } catch {
    return { errors: { general: "Wystąpił błąd podczas logowania." } }
  }
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}