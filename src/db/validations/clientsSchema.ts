import { z } from "zod";

export const clientsSchema = z.object({
    firstName: z.string().min(1, "Imię jest wymagane").max(50, "Imię jest za długie"),
    lastName: z.string().min(1, "Nazwisko jest wymagane").max(50, "Nazwisko jest za długie"),
    phone: z.string().min(9, "Numer jest za krótki").max(15, "Numer jest za długi"),
    street: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),

    houseNumber: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),

    zipCode: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),

    city: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),

    nip: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),

    companyName: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)),
});