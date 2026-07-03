import { LoginForm } from "../components/LoginForm";

export default function loginPage() {
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h2 className="mb-2 font-(family-name:--julius) text-3xl font-bold uppercase md:mb-4 md:text-5xl">
        Logowanie
      </h2>
      <p className="md:text-xl">Zaloguj się do systemu Memoria</p>
      <LoginForm />
    </div>
  );
}
