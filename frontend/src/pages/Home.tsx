import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import type { Product } from "../types/Product";
import { toast } from "react-toastify";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
          <Button variant="primary" onClick={() => addItemToCart(product.id)}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <header style={{ backgroundColor: "skyblue" }}>
        <h3>Webshop</h3>
        <div
          style={{
            position: "sticky",
            top: "3px",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "3px",
            zIndex: 1000, // ensures it's above other content
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Go to cart
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              navigate("/orders");
            }}
          >
            View orders
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Register/Login
          </Button>
          <hr />
        </div>
      </header>
      <Row
        xs={"auto"}
        md={"auto"}
        className="g-4"
        style={{ alignSelf: "center" }}
      >
        {products.map((product) => cardItem(product))}
      </Row>
    </Container>
  );
};

export default Home;
