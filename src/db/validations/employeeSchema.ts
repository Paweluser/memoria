import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię jest za długie"),

  lastName: z
    .string()
    .trim()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(50, "Nazwisko jest za długie"),

  email: z
    .string()
    .trim()
    .email("Niepoprawny adres e-mail")
    .max(255, "E-mail jest za długi"),

  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .max(255, "Hasło jest za długie"),

 role: z
  .enum(["ADMIN", "EMPLOYEE", "MANAGER"], {
    error: "Wybierz poprawną rolę",
  })
  .default("EMPLOYEE"),
});