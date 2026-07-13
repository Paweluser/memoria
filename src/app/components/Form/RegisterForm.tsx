"use client";

import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { useActionState } from "react";
import { signup } from "@/actions/authActions";
import { FormError } from "./UI/FormError";

export function RegisterForm() {
  const [state, formAction] = useActionState(signup, { errors: {} });

  return (
    <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
      <Input label="Imię:" inputAttribute="firstName" type="text" />
      {state.errors?.firstName && <FormError>{state.errors.firstName}</FormError>}
      <Input label="Nazwisko:" inputAttribute="lastName" type="text" />
      {state.errors?.lastName && <FormError>{state.errors.lastName}</FormError>}
      <Input label="E-mail:" inputAttribute="email" autoComplete="email" />
      {state.errors?.email && <FormError>{state.errors.email}</FormError>}
      <Input
        label="Hasło:"
        inputAttribute="password"
        autoComplete="new-password"
      />
      {state.errors?.password && <FormError>{state.errors.password}</FormError>}
      <SubmitBtn>Zarejestruj się</SubmitBtn>
    </form>
  );
}
