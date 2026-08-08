export type DeceasedData = {
  firstName: string;
  lastName: string;
  pesel: string;
  birthDate: string;
  deathDate: string;
  insured?: boolean; 
}

export type ClientData = {
  firstName: string;
  lastName: string;
  phone: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  nip?: string;
  companyName?: string;
}

export type CeremonyData = {
  city: string;
  funeralDate: string;
  funeralTime?: string;
  bringingInTime?: string;
  gatheringTime?: string;
  burialType: "Trumna" | "Urna" | ""; 
  notes?: string;
}