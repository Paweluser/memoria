import PageHeader from "@/app/components/DashboardLayout/PageHeader";
import { ClientForm } from "@/app/components/Form/ClientForm";

export default function NewFuneralPage() {
  return (
    <>
      <PageHeader title="Nowy pogrzeb" />
      <ClientForm />
    </>
  );
}
