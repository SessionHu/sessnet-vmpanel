import { DatabaseSync } from "node:sqlite"

export function getDatabase() {
  const path = process.env.SQLITE_PATH

  if (!path) {
    throw new Error("SQLITE_PATH is not set")
  }

  const db = new DatabaseSync(path)

  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS remotes (
      name TEXT PRIMARY KEY,
      host TEXT
    );

    CREATE TABLE IF NOT EXISTS instances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      remote TEXT,
      asn INTEGER,
      FOREIGN KEY (remote) REFERENCES remotes(name)
    );
  `)

  return db
}
