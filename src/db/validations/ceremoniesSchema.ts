import { z } from "zod";

export const burialTypeEnum = z.enum(["Trumna", "Urna"], {
  message: "Wybierz rodzaj pochówku (Trumna lub Urna)",
});

export const ceremoniesSchema = z.object({
  city: z.string().min(1, "Miasto jest wymagane").max(100, "Za długa nazwa miasta"),
  funeralDate: z.string().min(1, "Data ceremonii jest wymagana"),
  funeralTime: z.string().optional(),
  bringingInTime: z.string().optional(),
  gatheringTime: z.string().optional(),
  burialType: burialTypeEnum, 
  notes: z.string().optional(),
});