import { db } from "../index";

export async function getCeremonies() {
    const data = await db.query.ceremonies.findMany({
        with: {
            client: true,
            deceased: true,
            team: true
        }
    })
    return data;
}