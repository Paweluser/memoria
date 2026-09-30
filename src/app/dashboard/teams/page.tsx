import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";

export default function TeamsPage() {
  return (
    <div>
      <PageHeader
        title="Zespoły"
        description="Zbiór wszystkich zespołów oraz opcja dodawania nowych zespołów."
      />
      <div className="flex justify-center">
        <AppLink href="/dashboard/teams/new">Dodaj</AppLink>
      </div>
    </div>
  );
}
