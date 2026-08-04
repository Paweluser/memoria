"use client";

import { AppBtn } from "../AppBtn";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { burialTypeEnum } from "@/db/validations/ceremoniesSchema";

type CeremonyFormProps = {
  onNext: (data: FormData) => void;
  onPrev: () => void;
};

export function CeremonyForm({ onNext, onPrev }: CeremonyFormProps) {
  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onNext(new FormData(e.currentTarget));
      }}
    >
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

      <div className="flex justify-between pt-4">
        <AppBtn onClick={onPrev}>Wstecz</AppBtn>
        <SubmitBtn>Wyślij</SubmitBtn>
      </div>
    </form>
  );
}
