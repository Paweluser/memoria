export type TransportData = {
  managerId?: number | null;
  employeeId?: number | null;
  transportFrom: string;
  transportTo: string;
  clientPhoneNumber: string;
}

export interface TransportTableItem extends TransportData {
  id: number;
  manager: { id: number; firstName: string; lastName: string } | null;
  employee: { id: number; firstName: string; lastName: string } | null;
}

export type TransportTableData = TransportTableItem[];