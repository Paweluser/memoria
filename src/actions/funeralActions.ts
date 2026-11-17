"use server";

import { z } from "zod";
import { db } from "@/db"; 
import { clients, deceased, ceremonies } from "@/db/schema";
import { clientsSchema } from "@/db/validations/clientsSchema";
import { deceasedSchema } from "@/db/validations/deceasedSchema";
import { ceremoniesSchema } from "@/db/validations/ceremoniesSchema";
import { requireUser } from "@/db/session";
import { hasRole } from "@/db/permissions";
import { deleteFuneral } from "@/db/queries/ceremony";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createFuneralSchema = z.object({
  client: clientsSchema,
  deceased: deceasedSchema,
  ceremony: ceremoniesSchema,
});

type DeleteFuneralFormState = {
  errors: {
    general?: string[];
  };
};

export async function deleteFuneralAction(
  funeralId: number,
): Promise<DeleteFuneralFormState> {
  const session = await requireUser();

  try {
    const canDeleteFuneral = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

    if (!canDeleteFuneral) {
      return {
        errors: {
          general: ["Nie masz uprawnień do usuwania pogrzebów."],
        },
      };
    }

    const deletedFuneral = await deleteFuneral(funeralId);

    if (!deletedFuneral) {
      return {
        errors: {
          general: ["Pogrzeb już nie istnieje."],
        },
      };
    }
  } catch (error) {
    const databaseError =
      error instanceof Error ? (error.cause ?? error) : error;

    if (
      typeof databaseError === "object" &&
      databaseError !== null &&
      "constraint" in databaseError &&
      databaseError.constraint === "Invoice_ceremonyId_Ceremony_id_fk"
    ) {
      return {
        errors: {
          general: [
            "Nie można usunąć pogrzebu, ponieważ ma powiązaną fakturę.",
          ],
        },
      };
    }

    console.error("Błąd podczas usuwania pogrzebu:", error);

    return {
      errors: {
        general: ["Nie udało się usunąć pogrzebu."],
      },
    };
  }

  revalidatePath("/dashboard/funerals");
  revalidatePath(`/dashboard/funerals/${funeralId}`);
  redirect("/dashboard/funerals");
}

export async function createFuneralAction(data: unknown) {
  const session = await requireUser();

  try {
    const canCreateFuneral = await hasRole(session.userId, ["ADMIN", "MANAGER"]);

    if (!canCreateFuneral) {
      return {
        success: false,
        error: "Nie masz uprawnień do dodawania pogrzebów.",
      };
    }

    const validatedFields = createFuneralSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Wprowadzono nieprawidłowe dane.",
      };
    }

    const { client, deceased: deceasedData, ceremony } = validatedFields.data;

    await db.transaction(async (tx) => {
      const [insertedDeceased] = await tx
        .insert(deceased)
        .values(deceasedData)
        .returning({ id: deceased.id });

      const [insertedClient] = await tx
        .insert(clients)
        .values(client)
        .returning({ id: clients.id });

      await tx.insert(ceremonies).values({
        ...ceremony,
        clientId: insertedClient.id,
        deceasedId: insertedDeceased.id,
      });
      
    });

    return { 
      success: true, 
      message: "Pomyślnie dodano nową ceremonię!" 
    };

  } catch (error) {
    console.error("Błąd podczas zapisu ceremonii:", error);
    return { 
      success: false, 
      error: "Wystąpił błąd serwera podczas zapisu do bazy danych." 
    };
  }
}
