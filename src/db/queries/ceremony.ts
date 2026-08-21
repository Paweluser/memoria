import { count } from "drizzle-orm";
import { db } from "../index";
import { ceremonies } from "../schema";

export async function getCeremonies(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const data = await db.query.ceremonies.findMany({
        limit: pageSize,
        offset: offset,
        orderBy: (ceremonies, { desc }) => [desc(ceremonies.funeralDate)],
        with: {
            client: true,
            deceased: true,
            team: true
        }
    })

    const totalRecords = await db.select({ value: count() }).from(ceremonies);
    const totalCount = totalRecords[0].value;
    const totalPages = Math.ceil(totalCount / pageSize)
    return { data, totalPages };
}