import { z } from "zod";

export const burialTypeEnum = z.enum(["Trumna", "Urna"], {
  message: "Wybierz rodzaj pochówku",
});

export const ceremoniesSchema = z.object({
  city: z.string().min(1, "Miasto jest wymagane").max(100, "Za długa nazwa miasta"),
  funeralDate: z.string().min(1, "Data ceremonii jest wymagana"),
  funeralTime: z
    .string()
    .nullable() 
    .optional() 
    .transform((val) => (val === "" ? null : val)),

  bringingInTime: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),

  gatheringTime: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  burialType: burialTypeEnum, 
  notes: z.string().optional(),
});