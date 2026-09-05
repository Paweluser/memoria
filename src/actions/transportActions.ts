"use server";

import { db } from "@/db";
import { transportOrders } from "@/db/schema";
import { transportSchema } from "@/db/validations/transportSchema";
import { redirect } from "next/navigation";

export async function createTransportAction(
  prevState: unknown,
  formData: FormData
) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = transportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const formattedErrors: Record<string, string> = {};
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    for (const [key, messages] of Object.entries(fieldErrors)) {
      if (messages && messages.length > 0) {
        formattedErrors[key] = messages[0];
      }
    }

    return { errors: formattedErrors };
  }

  try {
    await db.insert(transportOrders).values(validatedFields.data);
  } catch (error) {
    console.error("Błąd bazy danych:", error);
    return {
      errors: { general: "Wystąpił błąd podczas zapisywania transportu." },
    };
  }

  redirect("/dashboard/transports");
}