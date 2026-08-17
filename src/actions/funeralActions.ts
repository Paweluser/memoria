"use server";

import { z } from "zod";
import { db } from "@/db"; 
import { clients, deceased, ceremonies } from "@/db/schema";
import { clientsSchema } from "@/db/validations/clientsSchema";
import { deceasedSchema } from "@/db/validations/deceasedSchema";
import { ceremoniesSchema } from "@/db/validations/ceremoniesSchema";

const createFuneralSchema = z.object({
  client: clientsSchema,
  deceased: deceasedSchema,
  ceremony: ceremoniesSchema,
});

export async function createFuneralAction(data: unknown) {
  const validatedFields = createFuneralSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validate error:", validatedFields.error.flatten());
    return {
      success: false,
      error: "Wprowadzono nieprawidłowe dane.",
    };
  }

  const { client, deceased: deceasedData, ceremony } = validatedFields.data;

  try {
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