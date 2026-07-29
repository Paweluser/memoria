"use client";

import { useActionState } from "react";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { burialTypeEnum } from "@/db/validations/ceremoniesSchema";

export function CeremonyForm() {
  // [state, formState] = useActionState()

  return (
    <form className="mt-8 flex w-full flex-col space-y-6" action="">
      <h2 className="border-b pb-2 text-xl">Krok 3: Dane ceremonii</h2>
      <Input
        label="Miasto"
        inputAttribute="city"
        type="text"
        maxLength={100}
        required
      />
      <Input
        label="Data ceremonii"
        inputAttribute="funeralDate"
        type="date"
        required
      />

      <Input
        label="Godzina ceremonii"
        inputAttribute="funeralTime"
        type="time"
      />
      <Input label="Wprowadzenie" inputAttribute="bringingInTime" type="time" />
      <Input label="Pożegnanie" inputAttribute="gatheringTime" type="time" />

      <div className="space-y-2">
        <label htmlFor="burialType" className="block text-sm">
          Rodzaj pochówku
        </label>
        <select
          id="burialType"
          name="burialType"
          className="w-full rounded-lg border px-4 py-3"
          required
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
      </div>

      <div className="flex justify-end pt-4">
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
