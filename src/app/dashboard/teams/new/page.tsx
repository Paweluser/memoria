import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TeamForm } from "@/app/components/Form/TeamForm";

export default function NewTeamPage() {
  return (
    <>
      <PageHeader title="Nowy zespół" />
      <TeamForm />
    </>
  );
}
