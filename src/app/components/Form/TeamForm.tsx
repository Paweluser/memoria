"use client";

import { useActionState } from "react";
import { createTeamAction } from "@/actions/teamActions";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";

export function TeamForm() {
  const [state, formAction] = useActionState(createTeamAction, {
    errors: {},
  });

  return (
    <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
      <h2 className="border-b pb-2 text-xl">Nowy zespół</h2>

      {state?.errors?.general && (
        <FormError>{state.errors.general[0]}</FormError>
      )}

      <Input label="Nazwa zespołu" inputAttribute="teamName" type="text" />
      {state?.errors?.teamName && (
        <FormError>{state.errors.teamName[0]}</FormError>
      )}

      <div className="flex justify-end pt-4">
        <SubmitBtn>Dodaj zespół</SubmitBtn>
      </div>
    </form>
  );
}
