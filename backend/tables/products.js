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
  { name: "Wireless Noise-Cancelling Headphones", price: 12000, stock: 12 },
  { name: "Stainless Steel Smart Water Bottle", price: 50000, stock: 40 },
  { name: "Portable Bluetooth Speaker", price: 34200, stock: 32 },
  { name: "Ergonomic Wireless Mouse", price: 10000, stock: 58 },
  { name: "4K Action Camera", price: 250000, stock: 18 },
  { name: "USB-C Fast Charging Power Bank", price: 7899, stock: 75 },
  { name: "Smart LED Desk Lamp", price: 15000, stock: 27 },
  { name: "Fitness Tracker Wristband", price: 42000, stock: 22 }
];

if (getproducts().length === 0){
  productList.forEach((e) => saveproducts(e.name, e.price, e.stock));
}
