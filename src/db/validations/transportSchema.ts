import { z } from "zod";

export const transportSchema = z.object({
  managerId: z
    .union([z.string(), z.number()])
    .nullable()
    .optional()
    .transform((val) => (val === "" || val == null ? null : Number(val))),
    
  employeeId: z
    .union([z.string(), z.number()])
    .nullable()
    .optional()
    .transform((val) => (val === "" || val == null ? null : Number(val))),

  transportFrom: z
    .string()
    .min(1, "Miejsce odbioru jest wymagane")
    .max(255, "Nazwa jest za długa"),

  transportTo: z
    .string()
    .min(1, "Miejsce docelowe jest wymagane")
    .max(255, "Nazwa jest za długa"),

  clientPhoneNumber: z
    .string()
    .min(9, "Numer telefonu jest za krótki")
    .max(15, "Numer telefonu jest za długi"),
});