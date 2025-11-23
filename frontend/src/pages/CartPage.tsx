import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItems";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    apiClient
      .get("/cart_items")
      .then((response) => setCartItems(response.data))
      .catch(() => toast.error("Failed to load products!"));
  }, []);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Failed to load products!"));
  }, []);

  const deleteCartItem = (productId: number) => {
    apiClient
      .delete(`/cart_items/${productId}`)
      .then(() => {
        toast.success("Item removed from cart!");
        setCartItems((prev)=> prev.filter((p)=> p.productId != productId))
      })
      .catch(() => {
        toast.error("Failed to remove item from cart!");
      });
  };

  const cardItem = (item: CartItem) => {
    const product = products.find((p) => p.id == item.productId);
    return (
      <>
        {product && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.price} Ft
                {product.stock <= 0 ? " (Out of stock)" : ""}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => deleteCartItem(product.id)}
              >
                Remove from cart
              </Button>
            </Card.Body>
          </Card>
        )}
      </>
    );
  };
  return (
    <>
      <div>
        <h1>Your Cart</h1>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
        <Row xs={"auto"} md={"auto"} className="g-4">
          {cartItems.map((cartItem) => cardItem(cartItem))}
        </Row>
      </div>
    </>
  );
};

export default CartPage;
