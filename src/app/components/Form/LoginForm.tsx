"use client";

import { useActionState } from "react";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { login } from "@/actions/authActions";
import { FormError } from "./UI/FormError";

export function LoginForm() {
  const [state, formAction] = useActionState(login, {
    errors: { general: "" },
  });

  return (
    <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
      <Input label="E-mail:" inputAttribute="email" autoComplete="email" />
      <Input
        label="Hasło:"
        inputAttribute="password"
        autoComplete="current-password"
      />
      {state.errors?.general && <FormError>{state.errors.general}</FormError>}
      <SubmitBtn>Zaloguj się</SubmitBtn>
    </form>
  );
}
