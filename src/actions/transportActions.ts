"use server";

import { db } from "@/db"; 
import { transportOrders } from "@/db/schema";
import { transportSchema } from "@/db/validations/transportSchema"; 
import { redirect } from "next/navigation"; 

export type TransportFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createTransportAction(
  prevState: TransportFormState, 
  formData: FormData
): Promise<TransportFormState> {
  
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = transportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: "Wprowadzono nieprawidłowe dane formularza.",
    };
  }

  try {
    await db.insert(transportOrders).values(validatedFields.data);
  } catch (error) {
    console.error("Błąd podczas zapisu transportu:", error);
    return { 
      success: false, 
      error: "Wystąpił błąd serwera podczas zapisu do bazy danych." 
    };
  }
  redirect("/dashboard/transports"); 
}