import { z } from "zod";

export const teamSchema = z.object({
    teamName: z
        .string()
        .trim()
        .min(2, "Nazwa zespołu musi mieć co najmniej 2 znaki.")
        .max(100, "Nazwa zespołu nie może przekraczać 100 znaków."),
});
