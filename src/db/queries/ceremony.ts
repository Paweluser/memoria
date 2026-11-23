import { and, asc, count, eq, gte, isNull, lt, notExists } from "drizzle-orm";
import { db } from "../index";
import { ceremonies, clients, deceased } from "../schema";

export async function getCeremoniesDashboardData() {
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Warsaw",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    const endDate = new Date(`${today}T00:00:00Z`);
    endDate.setUTCDate(endDate.getUTCDate() + 7);
    const weekEnd = endDate.toISOString().slice(0, 10);

    const nextSevenDays = and(
        gte(ceremonies.funeralDate, today),
        lt(ceremonies.funeralDate, weekEnd),
    );

    const [
        [todayResult],
        [weekResult],
        [withoutTeamResult],
        upcomingCeremonies,
    ] = await Promise.all([
        db
            .select({ value: count() })
            .from(ceremonies)
            .where(eq(ceremonies.funeralDate, today)),
        db
            .select({ value: count() })
            .from(ceremonies)
            .where(nextSevenDays),
        db
            .select({ value: count() })
            .from(ceremonies)
            .where(and(nextSevenDays, isNull(ceremonies.teamId))),
        db.query.ceremonies.findMany({
            where: gte(ceremonies.funeralDate, today),
            limit: 5,
            orderBy: [
                asc(ceremonies.funeralDate),
                asc(ceremonies.funeralTime),
                asc(ceremonies.id),
            ],
            columns: {
                id: true,
                city: true,
                funeralDate: true,
                funeralTime: true,
            },
            with: {
                deceased: {
                    columns: {
                        firstName: true,
                        lastName: true,
                    },
                },
                team: {
                    columns: {
                        teamName: true,
                    },
                },
            },
        }),
    ]);

    return {
        todayCount: todayResult.value,
        weekCount: weekResult.value,
        withoutTeamCount: withoutTeamResult.value,
        upcomingCeremonies,
    };
}

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
