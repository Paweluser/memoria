import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";

export function RegisterForm() {
  return (
    <form action="" className="mt-8 flex w-full flex-col space-y-6">
      <Input label="Imię:" inputAttribute="firstName" type="text" />
      <Input label="Nazwisko:" inputAttribute="lastName" type="text" />
      <Input label="E-mail:" inputAttribute="email" />
      <Input
        label="Hasło:"
        inputAttribute="password"
        autoComplete="current-password"
      />
      <SubmitBtn>Zarejestruj się</SubmitBtn>
    </form>
  );
}