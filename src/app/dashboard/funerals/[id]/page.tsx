import Link from "next/link";
import { notFound } from "next/navigation";
import { AppLink } from "@/app/components/AppLink";
import { PageHeader } from "@/app/components/DashboardLayout/PageHeader";
import { getCeremonyById } from "@/db/queries/ceremony";
import { requireUser } from "@/db/session";

type FuneralDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FuneralDetailsPage({
  params,
}: FuneralDetailsPageProps) {
  await requireUser();

  const { id } = await params;
  const funeral = await getCeremonyById(Number(id));

  if (!funeral) {
    notFound();
  }

  const clientAddress = [
    funeral.client?.street,
    funeral.client?.houseNumber,
    funeral.client?.zipCode,
    funeral.client?.city,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <PageHeader
        title="Szczegóły pogrzebu"
        description={
          funeral.deceased
            ? `${funeral.deceased.firstName} ${funeral.deceased.lastName}`
            : "Brak danych zmarłego."
        }
      />

      <div className="wrap-break-word">
        <section className="space-y-2 border-b border-(--table-border) py-6">
          <h3 className="mb-4 text-xl font-medium">Zmarły</h3>
          {funeral.deceased ? (
            <>
              <p>
                <strong>Imię i nazwisko:</strong> {funeral.deceased.firstName}{" "}
                {funeral.deceased.lastName}
              </p>
              <p>
                <strong>Data urodzenia:</strong> {funeral.deceased.birthDate}
              </p>
              <p>
                <strong>Data śmierci:</strong> {funeral.deceased.deathDate}
              </p>
              <p>
                <strong>PESEL:</strong> {funeral.deceased.pesel}
              </p>
              <p>
                <strong>Ubezpieczenie:</strong>{" "}
                {funeral.deceased.insured ? "Tak" : "Nie"}
              </p>
            </>
          ) : (
            <p>Brak danych zmarłego.</p>
          )}
        </section>

        <section className="space-y-2 border-b border-(--table-border) py-6">
          <h3 className="mb-4 text-xl font-medium">Zleceniodawca</h3>
          {funeral.client ? (
            <>
              <p>
                <strong>Imię i nazwisko:</strong> {funeral.client.firstName}{" "}
                {funeral.client.lastName}
              </p>
              <p>
                <strong>Telefon:</strong> {funeral.client.phone}
              </p>
              <p>
                <strong>Adres:</strong> {clientAddress || "Nie podano"}
              </p>
              {funeral.client.companyName && (
                <p>
                  <strong>Firma:</strong> {funeral.client.companyName}
                </p>
              )}
              {funeral.client.nip && (
                <p>
                  <strong>NIP:</strong> {funeral.client.nip}
                </p>
              )}
            </>
          ) : (
            <p>Brak danych zleceniodawcy.</p>
          )}
        </section>

        <section className="space-y-2 border-b border-(--table-border) py-6">
          <h3 className="mb-4 text-xl font-medium">Ceremonia</h3>
          <p>
            <strong>Miasto:</strong> {funeral.city}
          </p>
          <p>
            <strong>Data:</strong> {funeral.funeralDate}
          </p>
          <p>
            <strong>Godzina ceremonii:</strong>{" "}
            {funeral.funeralTime?.slice(0, 5) || "Nie podano"}
          </p>
          <p>
            <strong>Wprowadzenie:</strong>{" "}
            {funeral.bringingInTime?.slice(0, 5) || "Nie podano"}
          </p>
          <p>
            <strong>Pożegnanie:</strong>{" "}
            {funeral.gatheringTime?.slice(0, 5) || "Nie podano"}
          </p>
          <p>
            <strong>Rodzaj pochówku:</strong> {funeral.burialType}
          </p>
          <p>
            <strong>Zespół:</strong>{" "}
            {funeral.team ? (
              <Link
                href={`/dashboard/teams/${funeral.team.id}`}
                className="underline hover:text-(--accent-color)"
              >
                {funeral.team.teamName}
              </Link>
            ) : (
              "Brak zespołu"
            )}
          </p>
        </section>

        <section className="space-y-2 py-6">
          <h3 className="mb-4 text-xl font-medium">Notatki</h3>
          <p className="whitespace-pre-wrap">
            {funeral.notes || "Brak notatek."}
          </p>
        </section>
      </div>

      <div className="mt-6 flex justify-center">
        <AppLink href="/dashboard/funerals">Wróć do listy pogrzebów</AppLink>
      </div>
    </>
  );
}
