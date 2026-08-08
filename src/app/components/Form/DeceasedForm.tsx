"use client";

import { DeceasedData } from "@/types/funeralsTypes";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { deceasedSchema } from "@/db/validations/deceasedSchema";
import { useState } from "react";
import { FormError } from "./UI/FormError";
import z from "zod";

type DeceasedFormProps = {
  onNext: (data: DeceasedData) => void;
  savedData?: DeceasedData | null;
};

type FieldErrors = z.inferFlattenedErrors<typeof deceasedSchema>["fieldErrors"];

export function DeceasedForm({ onNext, savedData }: DeceasedFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataObject = Object.fromEntries(formData.entries());

        const validatedFields = deceasedSchema.safeParse(dataObject);

        if (!validatedFields.success) {
          setErrors(validatedFields.error.flatten().fieldErrors);
          return;
        }

        setErrors({});
        onNext(validatedFields.data);
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 1: Dane osoby zmarłej</h2>
      <Input
        label="Imię"
        inputAttribute="firstName"
        defaultValue={savedData?.firstName}
      />
      {errors.firstName && <FormError>{errors.firstName[0]}</FormError>}
      <Input
        label="Nazwisko"
        inputAttribute="lastName"
        defaultValue={savedData?.lastName}
      />
      {errors.lastName && <FormError>{errors.lastName[0]}</FormError>}
      <Input
        label="Pesel"
        inputAttribute="pesel"
        defaultValue={savedData?.pesel}
      />
      {errors.pesel && <FormError>{errors.pesel[0]}</FormError>}
      <Input
        label="Data urodzenia"
        inputAttribute="birthDate"
        type="date"
        defaultValue={savedData?.birthDate}
      />
      {errors.birthDate && <FormError>{errors.birthDate[0]}</FormError>}
      <Input
        label="Data śmierci"
        inputAttribute="deathDate"
        type="date"
        defaultValue={savedData?.deathDate}
      />
      {errors.deathDate && <FormError>{errors.deathDate[0]}</FormError>}
      <div className="mt-2 flex gap-2">
        <input
          type="checkbox"
          id="insured"
          name="insured"
          value="true"
          defaultChecked={savedData?.insured}
        />
        <label htmlFor="insured">Osoba ubezpieczona</label>
      </div>
      {errors.insured && <FormError>{errors.insured[0]}</FormError>}
      <div className="flex justify-end">
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
