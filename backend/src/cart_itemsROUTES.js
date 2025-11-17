import express from "express";
import {
  getCartProductsByUser,
  getcart_items,
  getcart_itemsById,
  addCartItem
} from "../tables/cart_items.js";

const cart_items_Routes = express.Router();

cart_items_Routes.get("/", (req, res) => {
  const cart_items = getcart_items();
  res.json(cart_items);
});

cart_items_Routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const cart_item = getcart_itemsById(id);
  if (!cart_item) {
    res.status(404).json({ message: "No such item in cart." });
  }
  res.json(cart_item);
});

cart_items_Routes.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const cart_items = getCartProductsByUser(id);
  if (!cart_items) {
    res.status(404).json({ message: "Cart is empty." });
  }
});

cart_items_Routes.post("/", (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const result = addCartItem(userId, productId, quantity);

  res.status(201).json({
    success: true,
    cartItemId: result.lastInsertRowid,
    message: "Item added to cart"
  });
});

export default cart_items_Routes;
