import { and, count, eq, notExists } from "drizzle-orm";
import { db } from "../index";
import { ceremonies, clients, deceased } from "../schema";

export async function deleteFuneral(id: number) {
    return db.transaction(async (tx) => {
        const [deletedCeremony] = await tx
            .delete(ceremonies)
            .where(eq(ceremonies.id, id))
            .returning({
                id: ceremonies.id,
                clientId: ceremonies.clientId,
                deceasedId: ceremonies.deceasedId,
            });

        if (!deletedCeremony) return;

        if (deletedCeremony.deceasedId !== null) {
            await tx
                .delete(deceased)
                .where(eq(deceased.id, deletedCeremony.deceasedId));
        }

        if (deletedCeremony.clientId !== null) {
            await tx
                .delete(clients)
                .where(
                    and(
                        eq(clients.id, deletedCeremony.clientId),
                        notExists(
                            tx
                                .select({ id: ceremonies.id })
                                .from(ceremonies)
                                .where(eq(ceremonies.clientId, deletedCeremony.clientId)),
                        ),
                    ),
                );
        }

        return deletedCeremony;
    });
}

export async function getCeremonyById(id: number) {
    return db.query.ceremonies.findFirst({
        where: eq(ceremonies.id, id),
        with: {
            client: true,
            deceased: true,
            team: {
                columns: {
                    id: true,
                    teamName: true,
                },
            },
        },
    });
}

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
