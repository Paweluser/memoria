import { AppLink } from "@/app/components/AppLink";
import PageHeader from "@/app/components/DashboardLayout/PageHeader";

export default function FuneralsPage() {
  return (
    <>
      <PageHeader
        title="Pogrzeby"
        description="Zbiór wszystkich pogrzebów oraz opcja dodawania nowych pogrzebów."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/funerals/new">Dodaj</AppLink>
      </div>
    </>
  );
}
