"use server";

import { db } from "@/db";
import { transportOrders } from "@/db/schema";
import { transportSchema } from "@/db/validations/transportSchema";
import { redirect } from "next/navigation";
import z from "zod";

type TransportFormState = {
  errors: z.inferFlattenedErrors<typeof transportSchema>["fieldErrors"] & {
    general?: string[];
  };
};

export async function createTransportAction(
  prevState: TransportFormState,
  formData: FormData
): Promise<TransportFormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = transportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await db.insert(transportOrders).values(validatedFields.data);
  } catch (error) {
    console.error("Błąd bazy danych:", error);
    return { errors: { general: ["Wystąpił błąd podczas zapisywania transportu."] } };
  }

  redirect("/dashboard/transports");
}