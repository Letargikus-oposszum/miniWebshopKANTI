import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);

  // Fetch cart items for this user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    apiClient
      .get(`/cart_items/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const items = res.data;

        if (items.length === 0) {
          toast.info("Your cart is empty!");
        }

        setCartItems(items);
      })
      .catch(() => {
        toast.error("Failed to load cart items!");
      });
  }, []);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Failed to load products!"));
  }, []);

  const handleCartItem = (cartItemId: number) => {
    apiClient
      .delete(`/cart_items/${cartItemId}`)
      .then(() => {
        toast.success("Item removed from cart!");
        setCartItems((prev) => prev.filter((p) => p.id !== cartItemId));
      })
      .catch(() => toast.error("Failed to remove item from cart!"));
  };

  const addToOrders = () => {
    if (cartItems.length === 0) {
      toast.info("Your cart is empty!");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const total = cartItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    
    const orderDTO = {
      userId: Number(userId),
      total,
      created_at: new Date().toISOString(),
    };

    apiClient
      .post("/orders", orderDTO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Order placed successfully!");
        // Remove all cart items after order
        cartItems.forEach((item) => handleCartItem(item.id));
        navigate("/orders");
      })
      .catch(() => toast.error("Failed to place order!"));
  };

  const cardItem = (item: CartItem) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return null;

    return (
      <Card style={{ width: "18rem" }} key={item.id}>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.price} Ft
            {product.stock <= 0 ? " (Out of stock)" : ""} <br />
            Quantity: {item.quantity}
          </Card.Text>
          <Button variant="danger" onClick={() => handleCartItem(item.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <header className="app-header">
        <h1>Your Cart</h1>
        <Button variant="" onClick={() => navigate("/")} className="me-2 navbutton">
          {" "}
          <FontAwesomeIcon icon={faHouse} />
        </Button>
        <Button onClick={addToOrders} variant="" className="me-2 navbutton">
          Order
        </Button>
        <Button onClick={() => navigate("/orders")} variant="" className="me-2 navbutton">
          View orders
        </Button>
      </header>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Row xs={"auto"} md={"auto"} className="g-4 my-3">
            {cartItems.map((cartItem) => cardItem(cartItem))}
          </Row>
        </>
      )}
    </div>
  );
};

export default CartPage;
