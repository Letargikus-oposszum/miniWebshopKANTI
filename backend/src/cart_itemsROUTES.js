import express from "express";
import {
  getCartProductsByUser,
  getcart_items,
  getcart_itemsById,
  addCartItem,
  deleteCartItemById,
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
  const cartItems = getCartProductsByUser(id);
  if (!cartItems || cartItems.length === 0) {
    return res.status(404).json({ message: "Cart is empty." });
  }
  res.json(cartItems);
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
    message: "Item added to cart",
  });
});

cart_items_Routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteCartItemById(id);
  res.json({ message: `Cart item with id ${id} deleted.` });
});

export default cart_items_Routes;
