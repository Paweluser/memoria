import { z } from "zod";

export const clientsSchema = z.object({
    firstName: z.string().min(1, "Imię jest wymagane").max(50, "Imię jest za długie"),
    lastName: z.string().min(1, "Nazwisko jest wymagane").max(50, "Nazwisko jest za długie"),
    phone: z.string().min(9, "Numer jest za krótki").max(15, "Numer jest za długi"),
    street: z.string().max(100, "Zbyt długa nazwa ulicy").optional(),
    houseNumber: z.string().max(10, "Zbyt długi numer").optional(),
    zipCode: z.string().max(10, "Zbyt długi kod pocztowy").optional(),
    city: z.string().max(100, "Zbyt długa nazwa miasta").optional(),
    nip: z.string().max(10, "NIP może mieć max 10 znaków").optional(),
    companyName: z.string().max(255, "Zbyt długa nazwa firmy").optional(),
});