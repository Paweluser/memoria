import { count } from "drizzle-orm";
import { db } from "../index";
import { transportOrders } from "../schema";

export async function getTransportOrders(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  const data = await db.query.transportOrders.findMany({
    limit: pageSize,
    offset: offset,
    orderBy: (transportOrders, { desc }) => [desc(transportOrders.id)],
    with: {
      manager: true,
      employee: true,
    },
  });

  const totalRecords = await db.select({ value: count() }).from(transportOrders);
  const totalCount = totalRecords[0].value;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}