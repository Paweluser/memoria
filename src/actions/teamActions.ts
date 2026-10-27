"use server";

import { db } from "@/db";
import { teams } from "@/db/schema";
import { teamSchema } from "@/db/validations/teamSchema";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { redirect } from "next/navigation";
import z from "zod";

type TeamFormState = {
    errors: z.inferFlattenedErrors<typeof teamSchema>["fieldErrors"] & {
        general?: string[];
    };
};

export async function createTeamAction(
    prevState: TeamFormState,
    formData: FormData,
): Promise<TeamFormState> {
    const session = await requireUser();

    try {
        const canCreateTeam = await hasRole(session.userId, ["ADMIN"]);

        if (!canCreateTeam) {
            return {
                errors: {
                    general: ["Nie masz uprawnień do dodawania zespołów."],
                },
            };
        }

        const rawData = Object.fromEntries(formData.entries());
        const validatedFields = teamSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        const { teamName } = validatedFields.data;

        await db.insert(teams).values({
            teamName,
        });
    } catch (error) {
        console.error("Błąd podczas dodawania zespołu:", error);
        return {
            errors: { general: ["Wystąpił błąd serwera podczas zapisywania."] },
        };
    }

    redirect("/dashboard/teams");
}
