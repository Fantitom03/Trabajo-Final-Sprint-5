import { connectDb, closeDb } from "../config/dbInitialConfig.js";
import { resetDatabase } from "../services/paisesServices.mjs";

async function run() {
  await connectDb();
  await resetDatabase();
  await closeDb();
}

run();