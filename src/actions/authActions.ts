"use server";

import { db } from "@/db";
import { employees } from "@/db/schema";

export async function signup(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors = {};

  if (!firstName || firstName.trim() === "") errors.firstName = "Imię jest wymagane.";
  if (!lastName || lastName.trim() === "") errors.lastName = "Nazwisko jest wymagane.";
  if (!email || !email.includes('@')) errors.email = "Niepoprawny adres e-mail.";
  if (!password || password.trim().length < 8) errors.password = "Hasło musi mieć co najmniej 8 znaków.";

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const existingUser = await db.query.employees.findFirst({
    where: eq(employees.email, email),
  })

  if (existingUser) {
    return  {errors: {email: "Konto z tym adresem e-mail już istnieje."}}
  }
}
