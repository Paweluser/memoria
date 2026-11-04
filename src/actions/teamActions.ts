"use server";

import { teamSchema, assignEmployeeSchema } from "@/db/validations/teamSchema";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { createTeamWithEmployees, getTeamById, updateTeamName } from "@/db/queries/team";
import { assignEmployeeToTeam, removeEmployeeFromTeam } from "@/db/queries/employee";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

type TeamFormState = {
    errors: z.inferFlattenedErrors<typeof teamSchema>["fieldErrors"] & {
        general?: string[];
    };
};

type AssignEmployeeFormState = {
    errors: z.inferFlattenedErrors<typeof assignEmployeeSchema>["fieldErrors"] & {
        general?: string[];
    };
};

type RemoveEmployeeFormState = {
    errors: {
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

        const validatedFields = teamSchema.safeParse({
            teamName: formData.get("teamName"),
        });

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        const validatedEmployees = z
            .array(assignEmployeeSchema.shape.employeeId)
            .safeParse(formData.getAll("employeeIds").map(Number));

        if (!validatedEmployees.success) {
            return {
                errors: {
                    general: ["Wybierz poprawnych pracowników."],
                },
            };
        }

        await createTeamWithEmployees(
            validatedFields.data.teamName,
            validatedEmployees.data,
        );
    } catch (error) {
        console.error("Błąd podczas dodawania zespołu:", error);
        return {
            errors: {
                general: [
                    "Nie udało się utworzyć zespołu. Odśwież stronę i spróbuj ponownie.",
                ],
            },
        };
    }

    revalidatePath("/dashboard/teams");
    revalidatePath("/dashboard/employees");

    redirect("/dashboard/teams");
}

export async function updateTeamAction(
    teamId: number,
    prevState: TeamFormState,
    formData: FormData,
): Promise<TeamFormState> {
    const session = await requireUser();

    try {
        const canEditTeam = await hasRole(session.userId, ["ADMIN"]);

        if (!canEditTeam) {
            return {
                errors: {
                    general: ["Nie masz uprawnień do edytowania zespołów."],
                },
            };
        }

        const rawData = Object.fromEntries(formData.entries());
        const validatedFields = teamSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const [updatedTeam] = await updateTeamName(
            teamId,
            validatedFields.data.teamName,
        );

        if (!updatedTeam) {
            return {
                errors: {
                    general: ["Zespół nie istnieje."],
                },
            };
        }
    } catch (error) {
        console.error("Błąd podczas edytowania zespołu:", error);

        return {
            errors: {
                general: ["Wystąpił błąd podczas zapisywania zmian."],
            },
        };
    }

    revalidatePath("/dashboard/teams");
    revalidatePath(`/dashboard/teams/${teamId}`);

    redirect(`/dashboard/teams/${teamId}`);
}

export async function assignEmployeeToTeamAction(
    teamId: number,
    prevState: AssignEmployeeFormState,
    formData: FormData,
): Promise<AssignEmployeeFormState> {
    const session = await requireUser();

    try {
        const canAssignEmployee = await hasRole(session.userId, ["ADMIN"]);

        if (!canAssignEmployee) {
            return {
                errors: {
                    general: ["Nie masz uprawnień do przypisywania pracowników."],
                },
            };
        }

        const validatedFields = assignEmployeeSchema.safeParse({
            employeeId: Number(formData.get("employeeId")),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const team = await getTeamById(teamId);

        if (!team) {
            return {
                errors: {
                    general: ["Zespół nie istnieje."],
                },
            };
        }

        const [assignedEmployee] = await assignEmployeeToTeam(
            validatedFields.data.employeeId,
            teamId,
        );

        if (!assignedEmployee) {
            return {
                errors: {
                    general: [
                        "Pracownik nie istnieje lub jest już przypisany do zespołu.",
                    ],
                },
            };
        }
    } catch (error) {
        console.error("Błąd podczas przypisywania pracownika:", error);

        return {
            errors: {
                general: ["Wystąpił błąd podczas przypisywania pracownika."],
            },
        };
    }

    revalidatePath("/dashboard/teams");
    revalidatePath(`/dashboard/teams/${teamId}`);
    revalidatePath("/dashboard/employees");

    redirect(`/dashboard/teams/${teamId}`);
}

export async function removeEmployeeFromTeamAction(
    teamId: number,
    employeeId: number,
): Promise<RemoveEmployeeFormState> {
    const session = await requireUser();

    try {
        const canRemoveEmployee = await hasRole(session.userId, ["ADMIN"]);

        if (!canRemoveEmployee) {
            return {
                errors: {
                    general: ["Nie masz uprawnień do odłączania pracowników."],
                },
            };
        }

        const [removedEmployee] = await removeEmployeeFromTeam(
            employeeId,
            teamId,
        );

        if (!removedEmployee) {
            return {
                errors: {
                    general: [
                        "Pracownik nie istnieje lub nie należy już do tego zespołu.",
                    ],
                },
            };
        }
    } catch (error) {
        console.error("Błąd podczas odłączania pracownika:", error);

        return {
            errors: {
                general: ["Wystąpił błąd podczas odłączania pracownika."],
            },
        };
    }

    revalidatePath("/dashboard/teams");
    revalidatePath(`/dashboard/teams/${teamId}`);
    revalidatePath("/dashboard/employees");

    redirect(`/dashboard/teams/${teamId}`);
}
