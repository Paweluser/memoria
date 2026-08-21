export type DeceasedData = {
  firstName: string;
  lastName: string;
  pesel: string;
  birthDate: string;
  deathDate: string;
  insured?: boolean | null; 
}

export type ClientData = {
  firstName: string;
  lastName: string;
  phone: string;
  street?: string | null;
  houseNumber?: string | null;
  zipCode?: string | null;
  city?: string | null;
  nip?: string | null;
  companyName?: string | null;
}

export type CeremonyData = {
  city: string;
  funeralDate: string;
  funeralTime?: string | null;
  bringingInTime?: string | null;
  gatheringTime?: string | null;
  burialType: string; 
  notes?: string | null;
}

export interface CeremonyTableItem extends CeremonyData {
  id: number;
  client: (ClientData & { id: number }) | null;
  deceased: (DeceasedData & { id: number }) | null;
  team: { id: number; teamName: string } | null;
}

export type CeremonyTableData = CeremonyTableItem[];