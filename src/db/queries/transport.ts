import { count, eq } from "drizzle-orm";
import { db } from "../index";
import { transportOrders } from "../schema";
import type { TransportData } from "@/types/transportsTypes";

export async function getTransportById(id: number) {
  return db.query.transportOrders.findFirst({
    where: eq(transportOrders.id, id),
    columns: {
      id: true,
      managerId: true,
      employeeId: true,
      transportFrom: true,
      transportTo: true,
      clientPhoneNumber: true,
    },
  });
}

export async function updateTransport(id: number, data: TransportData) {
  return db
    .update(transportOrders)
    .set({
      managerId: data.managerId ?? null,
      employeeId: data.employeeId ?? null,
      transportFrom: data.transportFrom,
      transportTo: data.transportTo,
      clientPhoneNumber: data.clientPhoneNumber,
    })
    .where(eq(transportOrders.id, id))
    .returning({ id: transportOrders.id });
}

export async function getTransportOrders(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  const data = await db.query.transportOrders.findMany({
    limit: pageSize,
    offset: offset,
    orderBy: (transportOrders, { desc }) => [desc(transportOrders.id)],
    with: {
      manager: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      employee: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const totalRecords = await db.select({ value: count() }).from(transportOrders);
  const totalCount = totalRecords[0].value;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}
