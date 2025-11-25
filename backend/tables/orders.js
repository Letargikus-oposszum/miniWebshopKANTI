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

export const getOrders = () => db.prepare("SELECT * FROM orders").all();

export const savecart_items = (userId, total, created_at) =>
  db
    .prepare(`INSERT INTO orders (userId, total, created_at) VALUES (?,?,?)`)
    .run(userId, total, created_at);
export const getOrdersByUser = (userId) =>
  db
    .prepare(
      `
    SELECT 
      orders.id AS orderId,
      orders.total,
      orders.created_at,
    FROM orders
    WHERE orders.userId = ?
  `
    )
    .all(userId);

export const deleteOrder = (id) =>
  db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);
