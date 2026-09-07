import { db } from "./index";
import { migrate } from "drizzle-orm/neon-serverless/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration completed");
  } catch (err) {
    console.error(`Error during migration: ${err}`);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

main();
