import db from "../database/databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS cart_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (userId) REFERENCES products(id)
    )`
).run();

export const getcart_items = () => db.prepare("SELECT * FROM cart_items").all();
export const getcart_itemsById = (id) =>
  db.prepare(`SELECT * FROM cart_items WHERE id = ?`).get(id);
export const savecart_items = (userId, productId) =>
  db
    .prepare(`INSERT INTO cart_items (userId, productId) VALUES (?,?)`)
    .run(userId, productId);
export const deletecart_items = (id) =>
  db.prepare(`DELETE FROM cart_items WHERE id = ?`).run(id);
