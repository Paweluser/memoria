import { AuthWrapper } from "../components/AuthWrapper";
import { RegisterForm } from "../components/Form/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthWrapper
      title="Rejestracja"
      description="Zarejestruj się do systemu Memoria"
    >
      <RegisterForm />
    </AuthWrapper>
  );
}
