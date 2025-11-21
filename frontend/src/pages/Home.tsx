import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import type { Product } from "../types/Product";
import { toast } from "react-toastify";
import { Button, Card, Container, Row } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Failed to load products!"));
  }, []);

  const cardItem = (product: Product) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <Row xs={"auto"} md={"auto"} className="g-4">
        {products.map((product) => cardItem(product))}
      </Row>
    </Container>
  );
};

export default Home;
