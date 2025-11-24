import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify/unstyled";
import type { Order } from "../types/Orders";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    apiClient
      .get("/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => {
        toast.error("Failed to load orders");
      });
  }, []);

  const handleOrder = (order: Order) => {
    apiClient
      .delete(`/orders/${order.id}`)
      .then(() => {
        toast.success("Order removed successfully");
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
      })
      .catch(() => {
        toast.error("Failed to remove order");
      });
  };

  const cardItem = (item: Order) => {
    return (
      <Card style={{ width: "18rem" }} key={item.id}>
        <Card.Body>
          <Card.Title>{new Date(item.created_at).toLocaleString()}</Card.Title>
          <Card.Text>{item.total} Ft</Card.Text>
          <Button variant="primary" onClick={() => handleOrder(item)}>
            Remove order
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <div>Home page</div>
      <Row xs={"auto"} md={"auto"} className="g-4 my-3">
        {orders.map((order) => cardItem(order))}
      </Row>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </>
  );
};

export default OrdersPage;
