import { AuthWrapper } from "../components/AuthWrapper";
import { LoginForm } from "../components/Form/LoginForm";

export default function LoginPage() {
  return (
    <AuthWrapper title="Logowanie" description="Zaloguj się do systemu Memoria">
      <LoginForm />
    </AuthWrapper>
  );
}
