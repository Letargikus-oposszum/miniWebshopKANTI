import db from "../database/databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    price INTEGER,
    stock INTEGER 
    )`
).run();

export const getproducts = () => db.prepare("SELECT * FROM products").all();
export const getproductsById = (id) =>
  db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
export const saveproducts = (name, price, stock) =>
  db
    .prepare(`INSERT INTO products (name, price, stock) VALUES (?,?,?)`)
    .run(name, price, stock);

const productList = [
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
  { name: "gggg", price: 120, stock: 25 },
];

productList.forEach((e) => saveproducts(e.name, e.price, e.stock));
