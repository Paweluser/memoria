"use client";

import { useActionState } from "react";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";

export function ClientForm() {
  // [state, formState] = useActionState()
  return (
    <form className="mt-8 flex w-full flex-col space-y-6" action="">
      <h2 className="border-b pb-2 text-xl">Krok 2: Dane Zleceniodawcy</h2>
      <Input label="Imię" inputAttribute="firstName" maxLength={50} required />
      <Input
        label="Nazwisko"
        inputAttribute="lastName"
        maxLength={50}
        required
      />
      <Input
        label="Numer telefonu"
        inputAttribute="phone"
        type="tel"
        autoComplete="tel"
        maxLength={15}
        required
      />
      <Input
        label="Ulica"
        inputAttribute="street"
        type="text"
        maxLength={100}
      />
      <Input
        label="Numer domu"
        inputAttribute="houseNumber"
        type="text"
        maxLength={10}
      />
      <Input
        label="Kod pocztowy"
        inputAttribute="zipCode"
        type="text"
        maxLength={10}
      />
      <Input label="Miasto" inputAttribute="city" type="text" maxLength={100} />
      <Input
        label="Numer NIP"
        inputAttribute="nip"
        type="text"
        maxLength={10}
      />
      <Input
        label="Nazwa firmy"
        inputAttribute="companyName"
        type="text"
        maxLength={255}
      />

      <div className="flex justify-end">
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
