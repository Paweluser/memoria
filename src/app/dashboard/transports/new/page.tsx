import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { TransportForm } from "@/app/components/Form/TransportForm";

export default function NewTransportPage() {
  return (
    <>
      <PageHeader title="Nowy transport" />
      <TransportForm />
    </>
  );
}
