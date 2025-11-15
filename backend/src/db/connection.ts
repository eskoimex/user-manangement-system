import sqlite3 from "sqlite3";
import config from "config";
import path from "path";

const dbPath = config.get("dbPath") as string;
const absoluteDbPath = path.resolve(process.cwd(), dbPath);

export const connection = new sqlite3.Database(absoluteDbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database:", absoluteDbPath);
  }
});

connection.on("error", (err) => {
  console.error("Database error:", err);
});