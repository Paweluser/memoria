
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { FuneralWizard } from "@/app/components/FuneralWizard";

export default function NewFuneralPage() {
  return (
    <>
      <PageHeader title="Nowy pogrzeb" />
      <FuneralWizard />
    </>
  );
}
