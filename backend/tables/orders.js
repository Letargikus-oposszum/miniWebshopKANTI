import db from "../database/databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    total INTEGER,
    created_at DATE,
    FOREIGN KEY (userId) REFERENCES users(id)
    )`
).run();

export const savecart_items = (userId, total, created_at) =>
  db
    .prepare(
      `INSERT INTO cart_items (userId, total, created_at) VALUES (?,?,?)`
    )
    .run(userId, total, created_at);
