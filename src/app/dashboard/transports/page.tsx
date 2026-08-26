import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";

export default function TransportsPage() {
  return (
    <>
      <PageHeader
        title="Przewozy"
        description="Zbiór wszystkich aktualnych przewozów."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/transports/new">Dodaj</AppLink>
      </div>
    </>
  );
}
