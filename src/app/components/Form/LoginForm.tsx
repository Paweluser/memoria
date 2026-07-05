import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";

export function LoginForm() {
  return (
    <form action="" className="mt-8 flex w-full flex-col space-y-6">
      <Input label="E-mail:" inputAttribute="email" />
      <Input
        label="Hasło:"
        inputAttribute="password"
        autoComplete="current-password"
      />
      <SubmitBtn>Zaloguj się</SubmitBtn>
    </form>
  );
}
