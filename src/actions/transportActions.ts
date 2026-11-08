"use server";

import { db } from "@/db";
import { transportOrders } from "@/db/schema";
import { transportSchema } from "@/db/validations/transportSchema";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { updateTransport } from "@/db/queries/transport";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

type TransportFormState = {
  errors: z.inferFlattenedErrors<typeof transportSchema>["fieldErrors"] & {
    general?: string[];
  };
};

export async function createTransportAction(
  prevState: TransportFormState,
  formData: FormData,
): Promise<TransportFormState> {
  const session = await requireUser();

  try {
    const canCreateTransport = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

    if (!canCreateTransport) {
      return {
        errors: {
          general: ["Nie masz uprawnień do dodawania przewozów."],
        },
      };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = transportSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    await db.insert(transportOrders).values(validatedFields.data);
  } catch (error) {
    console.error("Błąd podczas dodawania przewozu:", error);
    return {
      errors: {
        general: ["Wystąpił błąd podczas zapisywania transportu."],
      },
    };
  }

  revalidatePath("/dashboard/transports");
  redirect("/dashboard/transports");
}

export async function updateTransportAction(
  transportId: number,
  prevState: TransportFormState,
  formData: FormData,
): Promise<TransportFormState> {
  const session = await requireUser();

  try {
    const canEditTransport = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

    if (!canEditTransport) {
      return {
        errors: {
          general: ["Nie masz uprawnień do edytowania przewozów."],
        },
      };
    }

    const validatedFields = transportSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const [updatedTransport] = await updateTransport(
      transportId,
      validatedFields.data,
    );

    if (!updatedTransport) {
      return {
        errors: {
          general: ["Przewóz nie istnieje."],
        },
      };
    }
  } catch (error) {
    console.error("Błąd podczas edytowania przewozu:", error);

    return {
      errors: {
        general: ["Wystąpił błąd podczas zapisywania zmian."],
      },
    };
  }

  revalidatePath("/dashboard/transports");
  revalidatePath(`/dashboard/transports/${transportId}/edit`);
  redirect("/dashboard/transports");
}
