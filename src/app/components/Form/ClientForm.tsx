"use client";

import { ClientData } from "@/types/funeralsTypes";
import { AppBtn } from "../AppBtn";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";

type ClientFormProps = {
  onNext: (data: ClientData) => void;
  onPrev: () => void;
  savedData?: ClientData | null;
};

export function ClientForm({ onNext, onPrev, savedData }: ClientFormProps) {
  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataObject = Object.fromEntries(formData.entries()) as ClientData;

        onNext(dataObject);
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 2: Dane Zleceniodawcy</h2>
      <Input
        label="Imię"
        inputAttribute="firstName"
        maxLength={50}
        required
        defaultValue={savedData?.firstName}
      />
      <Input
        label="Nazwisko"
        inputAttribute="lastName"
        maxLength={50}
        required
        defaultValue={savedData?.lastName}
      />
      <Input
        label="Numer telefonu"
        inputAttribute="phone"
        type="tel"
        autoComplete="tel"
        maxLength={15}
        required
        defaultValue={savedData?.phone}
      />
      <Input
        label="Ulica"
        inputAttribute="street"
        type="text"
        maxLength={100}
        defaultValue={savedData?.street}
      />
      <Input
        label="Numer domu"
        inputAttribute="houseNumber"
        type="text"
        maxLength={10}
        defaultValue={savedData?.houseNumber}
      />
      <Input
        label="Kod pocztowy"
        inputAttribute="zipCode"
        type="text"
        maxLength={10}
        defaultValue={savedData?.zipCode}
      />
      <Input
        label="Miasto"
        inputAttribute="city"
        type="text"
        maxLength={100}
        defaultValue={savedData?.city}
      />
      <Input
        label="Numer NIP"
        inputAttribute="nip"
        type="text"
        maxLength={10}
        defaultValue={savedData?.nip}
      />
      <Input
        label="Nazwa firmy"
        inputAttribute="companyName"
        type="text"
        maxLength={255}
        defaultValue={savedData?.companyName}
      />

      <div className="flex justify-between">
        <AppBtn onClick={onPrev}>Wstecz</AppBtn>
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
