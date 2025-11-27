import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify/unstyled";
import type { Order } from "../types/Orders";
import { faHouse, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }
    apiClient
      .get(`/orders/user/${userId}`)
      .then((res) => {
        const items = res.data;

        if (items.length === 0) {
          toast.info("No current orders!");
        }
        setOrders(items);
      })
      .catch(() => {
        toast.error("Failed to load orders!");
      });
  }, []);

  const handleOrder = (order: Order) => {
    apiClient
      .delete(`/orders/${order.id}`)
      .then(() => {
        toast.success("Order removed successfully!");
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
      })
      .catch(() => {
        toast.error("Failed to remove order!");
      });
  };

  const cardItem = (item: Order) => {
    return (
      <Card style={{ width: "18rem" }} key={item.id}>
        <Card.Body>
          <Card.Title>{new Date(item.created_at).toLocaleString()}</Card.Title>
          <Card.Text>{item.total} Ft</Card.Text>
          <Button variant="danger" onClick={() => handleOrder(item)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <header className="app-header">
        <h1>Your orders</h1>
        <Button variant="" onClick={() => navigate("/")} className="me-2 navbutton">
          {" "}
          <FontAwesomeIcon icon={faHouse} />
        </Button>{" "}
      </header>
      <Row xs={"auto"} md={"auto"} className="g-4 my-3">
        {orders.map((order) => cardItem(order))}
      </Row>
    </>
  );
};

export default OrdersPage;
