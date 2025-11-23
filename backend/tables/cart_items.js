import db from "../database/databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS cart_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    quantity INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
    )`
).run();

export const getcart_items = () => db.prepare("SELECT * FROM cart_items").all();
export const addCartItem = (userId, productId, quantity) =>
  db
    .prepare(
      `INSERT INTO cart_items (userId, productId, quantity) VALUES (?,?,?)`
    )
    .run(userId, productId, quantity);
export const getcart_itemsById = (id) =>
  db.prepare(`SELECT * FROM cart_items WHERE id = ?`).get(id);
export const getCartProductsByUser = (userId) =>
  db
    .prepare(
      `
    SELECT 
      cart_items.id AS cartItemId,
      products.id AS productId,
      products.name,
      products.price,
      products.stock,
      cart_items.quantity
    FROM cart_items
    JOIN products ON cart_items.productId = products.id
    WHERE cart_items.userId = ?
  `
    )
    .all(userId);

export const deleteCartItemById = (id) =>
  db.prepare(`DELETE FROM cart_items WHERE id = ?`).run(id);
