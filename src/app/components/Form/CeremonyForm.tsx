"use client";

import { CeremonyData } from "@/types/funeralsTypes";
import { AppBtn } from "../AppBtn";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { burialTypeEnum } from "@/db/validations/ceremoniesSchema";

type CeremonyFormProps = {
  onNext: (data: CeremonyData) => void;
  onPrev: () => void;
  savedData?: CeremonyData | null;
};

export function CeremonyForm({ onNext, onPrev, savedData }: CeremonyFormProps) {
  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataObject = Object.fromEntries(
          formData.entries(),
        ) as CeremonyData;

        onNext(dataObject);
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 3: Dane ceremonii</h2>
      <Input
        label="Miasto"
        inputAttribute="city"
        type="text"
        maxLength={100}
        required
        defaultValue={savedData?.city}
      />
      <Input
        label="Data ceremonii"
        inputAttribute="funeralDate"
        type="date"
        required
        defaultValue={savedData?.funeralDate}
      />

      <Input
        label="Godzina ceremonii"
        inputAttribute="funeralTime"
        type="time"
        defaultValue={savedData?.funeralTime}
      />
      <Input
        label="Wprowadzenie"
        inputAttribute="bringingInTime"
        type="time"
        defaultValue={savedData?.bringingInTime}
      />
      <Input
        label="Pożegnanie"
        inputAttribute="gatheringTime"
        type="time"
        defaultValue={savedData?.gatheringTime}
      />

      <div className="space-y-2">
        <label htmlFor="burialType" className="block text-sm">
          Rodzaj pochówku
        </label>
        <select
          id="burialType"
          name="burialType"
          className="w-full rounded-lg border px-4 py-3"
          required
          defaultValue={savedData?.burialType}
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
