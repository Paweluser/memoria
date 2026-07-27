import { z } from "zod";

export const deceasedSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane").max(50, "Imię jest za długie"),
  lastName: z.string().min(1, "Nazwisko jest wymagane").max(50, "Nazwisko jest za długie"),
  pesel: z.string().length(11, "PESEL musi składać się dokładnie z 11 znaków"),
  birthDate: z.string().min(1, "Data urodzenia jest wymagana"),
  deathDate: z.string().min(1, "Data śmierci jest wymagana"),
  insured: z.string()
    .optional()
    .transform((val) => val === "true"), 
});