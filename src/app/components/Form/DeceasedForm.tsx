"use client";

import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";

type DeceasedFormProps = {
  onNext: (data: FormData) => void;
};

export function DeceasedForm({ onNext }: DeceasedFormProps) {
  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onNext(new FormData(e.currentTarget));
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 1: Dane osoby zmarłej</h2>
      <Input label="Imię" inputAttribute="firstName" required />
      <Input label="Nazwisko" inputAttribute="lastName" required />
      <Input label="Pesel" inputAttribute="pesel" required />
      <Input
        label="Data urodzenia"
        inputAttribute="birthDate"
        type="date"
        required
      />
      <Input
        label="Data śmierci"
        inputAttribute="deathDate"
        type="date"
        required
      />
      <div className="mt-2 flex gap-2">
        <input type="checkbox" id="insured" name="insured" value="true" />
        <label htmlFor="insured">Osoba ubezpieczona</label>
      </div>
      <div className="flex justify-end">
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
