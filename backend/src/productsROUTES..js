import express from "express";
import { getproducts, getproductsById } from "../tables/products.js";

const products_routes = express.Router();

products_routes.get("/", (req, res) => {
  const products = getproducts();
  res.json(products);
});

products_routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const product = getproductsById(id);
  if (!product) {
    res.status(404).json({ message: "No such product in stock" });
  }
  res.json(product);
});

export default products_routes;
