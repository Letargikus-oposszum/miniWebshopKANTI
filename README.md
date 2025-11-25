# React + TypeScript + Vite

Ez a 10 webshop-os feladat

route-ok:
app.use("/cart_items", cart_items_Routes);
app.use("/orders", order_routes);
app.use("/products", products_routes);
app.use("/users", user_routes);

táblák:
cart_items (id, userId, productId, quantity)
users (id, email, password)
products (id, name, price, stock)
orders (id, userId, total, created_at)

kimaradtak: orders nem csak az adott usernek látszik, dizájn minimalista