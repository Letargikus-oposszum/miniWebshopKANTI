import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import type { Product } from "../types/Product";
import { toast } from "react-toastify";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faBox, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Failed to load products!"));
  }, []);

  const addItemToCart = (productId: number) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate("/login");
      return;
    }

    apiClient
      .post(
        "/cart_items",
        {
          userId: userId,
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Item added to cart!");
      })
      .catch(() => {
        toast.error("Failed to add item to cart!");
      });
  };

  const cardItem = (product: Product) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.price} Ft
            {product.stock <= 0 ? " (Out of stock)" : ""}
          </Card.Text>
          <Button variant="success" onClick={() => addItemToCart(product.id)}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <header className="app-header">
        <div className="header-left">
          <h2 className="logo">Webshop</h2>
        </div>

        <div className="header-right">
          <Button variant="" onClick={() => navigate("/cart")} className="navbutton">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>

          <Button variant="" onClick={() => navigate("/orders")} className="navbutton">
            <FontAwesomeIcon icon={faBox} />
          </Button>

          <Button variant="" onClick={() => navigate("/login")} className="navbutton">
            Login / Register
          </Button>
        </div>
      </header>

      <Row
        xs={"auto"}
        md={"auto"}
        className="g-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {products.map((product) => cardItem(product))}
      </Row>
    </Container>
  );
};

export default Home;
