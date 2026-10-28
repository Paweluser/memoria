import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";

type AccessDeniedProps = {
  message: string;
  backHref: string;
  backLabel: string;
};

export function AccessDenied({
  message,
  backHref,
  backLabel,
}: AccessDeniedProps) {
  return (
    <>
      <PageHeader title="Brak dostępu" />

      <p className="mb-4">{message}</p>

      <AppLink href={backHref}>{backLabel}</AppLink>
    </>
  );
}
