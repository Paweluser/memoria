import PageHeader from "@/app/components/DashboardLayout/PageHeader";
import { DeceasedForm } from "@/app/components/Form/DeceasedForm";

export default function NewFuneralPage() {
  return (
    <>
      <PageHeader title="Nowy pogrzeb" />
      <DeceasedForm />
    </>
  );
}
