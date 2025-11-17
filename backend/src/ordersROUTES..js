import express from "express";
import { savecart_items } from "../tables/orders.js";

const order_routes = express.Router();

order_routes.post("/", (req, res) => {
  const { userId, total, created_at } = req.body;

  const result = savecart_items(userId, total, created_at);

  res.json({ success: true, id: result.lastInsertRowid });
});

export default order_routes;
