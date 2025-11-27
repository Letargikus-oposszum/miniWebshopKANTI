import express from "express";
import {
  savecart_items,
  deleteOrder,
  getOrders,
  getOrdersByUser,
} from "../tables/orders.js";

const order_routes = express.Router();

order_routes.get("/", (req, res) => {
  const orders = getOrders();

  res.json(orders);
});

order_routes.post("/", (req, res) => {
  const { userId, total, created_at } = req.body;

  const result = savecart_items(userId, total, created_at);

  res.json({ success: true, id: result.lastInsertRowid });
});

order_routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteOrder(id);
  res.json({ message: `Order with id ${id} deleted.` });
});
order_routes.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const orders = getOrdersByUser(id);
  if (!orders) {
    return res.status(404).json({ message: "No orders!." });
  }
  res.json(orders);
});
export default order_routes;
