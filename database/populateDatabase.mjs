import { connectDb, closeDb } from "../config/dbInitialConfig.js";
import { populateDatabase } from "../services/paisesServices.mjs";

async function run() {
    await connectDb();
    await populateDatabase();
    await closeDb();
}
  
run();