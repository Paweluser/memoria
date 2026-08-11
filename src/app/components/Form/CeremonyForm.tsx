"use client";

import { useState } from "react";
import { CeremonyData } from "@/types/funeralsTypes";
import { AppBtn } from "../AppBtn";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";
import {
  burialTypeEnum,
  ceremoniesSchema,
} from "@/db/validations/ceremoniesSchema";
import z from "zod";

type CeremonyFormProps = {
  onNext: (data: CeremonyData) => void;
  onPrev: () => void;
  savedData?: CeremonyData | null;
};

type FieldErrors = z.inferFlattenedErrors<
  typeof ceremoniesSchema
>["fieldErrors"];

export function CeremonyForm({ onNext, onPrev, savedData }: CeremonyFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataObject = Object.fromEntries(formData.entries());

        const validatedFields = ceremoniesSchema.safeParse(dataObject);

        if (!validatedFields.success) {
          setErrors(validatedFields.error.flatten().fieldErrors);
          return;
        }

        setErrors({});
        onNext(validatedFields.data as CeremonyData);
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 3: Dane ceremonii</h2>

      <Input
        label="Miasto"
        inputAttribute="city"
        type="text"
        defaultValue={savedData?.city}
      />
      {errors.city && <FormError>{errors.city[0]}</FormError>}

      <Input
        label="Data ceremonii"
        inputAttribute="funeralDate"
        type="date"
        defaultValue={savedData?.funeralDate}
      />
      {errors.funeralDate && <FormError>{errors.funeralDate[0]}</FormError>}

      <Input
        label="Godzina ceremonii"
        inputAttribute="funeralTime"
        type="time"
        defaultValue={savedData?.funeralTime}
      />
      {errors.funeralTime && <FormError>{errors.funeralTime[0]}</FormError>}

      <Input
        label="Wprowadzenie"
        inputAttribute="bringingInTime"
        type="time"
        defaultValue={savedData?.bringingInTime}
      />
      {errors.bringingInTime && (
        <FormError>{errors.bringingInTime[0]}</FormError>
      )}

      <Input
        label="Pożegnanie"
        inputAttribute="gatheringTime"
        type="time"
        defaultValue={savedData?.gatheringTime}
      />
      {errors.gatheringTime && <FormError>{errors.gatheringTime[0]}</FormError>}

      <div className="space-y-2">
        <label htmlFor="burialType" className="block text-sm">
          Rodzaj pochówku
        </label>
        <select
          id="burialType"
          name="burialType"
          className="w-full rounded-lg border px-4 py-3"
          defaultValue={savedData?.burialType || ""}
        >
          <option value="" disabled>
            Wybierz opcję...
          </option>
          {burialTypeEnum.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.burialType && <FormError>{errors.burialType[0]}</FormError>}
      </div>

      <div className="flex justify-between pt-4">
        <AppBtn onClick={onPrev}>Wstecz</AppBtn>
        <SubmitBtn>Wyślij</SubmitBtn>
      </div>
    </form>
  );
}
