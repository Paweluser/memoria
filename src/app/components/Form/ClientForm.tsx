"use client";

import { useState } from "react";
import { ClientData } from "@/types/funeralsTypes";
import { AppBtn } from "../AppBtn";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";
import { clientsSchema } from "@/db/validations/clientsSchema";
import z from "zod";

type ClientFormProps = {
  onNext: (data: ClientData) => void;
  onPrev: () => void;
  savedData?: ClientData | null;
};

type FieldErrors = z.inferFlattenedErrors<typeof clientsSchema>["fieldErrors"];

export function ClientForm({ onNext, onPrev, savedData }: ClientFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  return (
    <form
      className="mt-8 flex w-full flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataObject = Object.fromEntries(formData.entries());

        const validatedFields = clientsSchema.safeParse(dataObject);

        if (!validatedFields.success) {
          setErrors(validatedFields.error.flatten().fieldErrors);
          return;
        }

        setErrors({});
        onNext(validatedFields.data);
      }}
    >
      <h2 className="border-b pb-2 text-xl">Krok 2: Dane Zleceniodawcy</h2>

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
        label="Numer telefonu"
        inputAttribute="phone"
        type="tel"
        autoComplete="tel"
        defaultValue={savedData?.phone}
      />
      {errors.phone && <FormError>{errors.phone[0]}</FormError>}

      <Input
        label="Ulica"
        inputAttribute="street"
        type="text"
        defaultValue={savedData?.street}
      />
      {errors.street && <FormError>{errors.street[0]}</FormError>}

      <Input
        label="Numer domu"
        inputAttribute="houseNumber"
        type="text"
        defaultValue={savedData?.houseNumber}
      />
      {errors.houseNumber && <FormError>{errors.houseNumber[0]}</FormError>}

      <Input
        label="Kod pocztowy"
        inputAttribute="zipCode"
        type="text"
        defaultValue={savedData?.zipCode}
      />
      {errors.zipCode && <FormError>{errors.zipCode[0]}</FormError>}

      <Input
        label="Miasto"
        inputAttribute="city"
        type="text"
        defaultValue={savedData?.city}
      />
      {errors.city && <FormError>{errors.city[0]}</FormError>}

      <Input
        label="Numer NIP"
        inputAttribute="nip"
        type="text"
        defaultValue={savedData?.nip}
      />
      {errors.nip && <FormError>{errors.nip[0]}</FormError>}

      <Input
        label="Nazwa firmy"
        inputAttribute="companyName"
        type="text"
        defaultValue={savedData?.companyName}
      />
      {errors.companyName && <FormError>{errors.companyName[0]}</FormError>}

      <div className="flex justify-between pt-4">
        <AppBtn onClick={onPrev}>Wstecz</AppBtn>
        <SubmitBtn>Dalej</SubmitBtn>
      </div>
    </form>
  );
}
