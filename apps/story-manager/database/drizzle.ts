/* eslint-disable turbo/no-undeclared-env-vars */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString!, { prepare: false });
const db = drizzle(client);

export { db, getTableColumns, eq, between, count, asc, sql };
