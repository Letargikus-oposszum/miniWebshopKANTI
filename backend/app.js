import express from "express";
import cart_items_Routes from "./src/cart_itemsROUTES.js";
import cors from "cors";
import order_routes from "./src/ordersROUTES..js";
import products_routes from "./src/productsROUTES..js";
import user_routes from "./src/usersROUTES..js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(cors());

app.use("/cart_items", cart_items_Routes);
app.use("/orders", order_routes);
app.use("/products", products_routes);
app.use("/users", user_routes);

app.listen(PORT, console.log("The server is running on port: " + PORT));
