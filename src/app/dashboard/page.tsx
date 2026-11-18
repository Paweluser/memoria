import { PageHeader } from "../components/DashboardLayout/PageHeader";
import { requireUser } from "@/db/session";


export default async function DashboardPage() {
  await requireUser();

  return (
    <PageHeader
      title="Panel główny"
      description="Zbiór najważniejszych informacji dotyczącej działalności"
    />
  );
}
