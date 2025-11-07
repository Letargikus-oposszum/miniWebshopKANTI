import db from "../database/databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email STRING,
    password STRING 
    )`
).run();

export const getUserById = (id) =>
  db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
export const saveUser = (email, password) =>
  db
    .prepare(`INSERT INTO users (email, password) VALUES (?,?)`)
    .run(email, password);
export const updateUser = (email, password, id) =>
  db
    .prepare(`UPDATE users SET email=?, password=? WHERE id = ?`)
    .run(email, password, id);
export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
