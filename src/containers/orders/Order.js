import React, { useState, useEffect } from "react";
import axios from "../../axios";
import styles from "./NewOrder.module.css";

const Order = (props) => {
  const [order, setOrder] = useState({ customer: 1, price: 0, items: {} });

  useEffect(() => {
    axios
      .get("/orders/" + props.match.params.id + ".json")
      .then((response) => {
        return setOrder(response.data);
      })
      .catch((error) => console.log(error));
  }, [props]);

  const items = Object.values(order.items).map((item) => (
    <li style={{ listStyleType: "none" }} key={item.name}>
      <span className={styles.Controls}>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
      </span>
    </li>
  ));

  return (
    <>
      <h1>Order id: {props.match.params.id}</h1>
      <ul>{items}</ul>
      <p>Total price: {order.price}$</p>
    </>
  );
};

export default Order;
