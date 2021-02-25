import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./NewOrder.module.css";
import axios from "../../axios";

const OrderList = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/orders.json?orderBy="customer"&equalTo="' + props.customer + '"')
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  },[props]);

  let ordersComps = Object.keys(orders).map((order) => (
    <li key={order}>
      <span className={styles.Controls}>
        <Link to={"/order/" + order}>{order}</Link>
        <p>Total price: {orders[order].price}</p>
      </span>
    </li>
  ));

  return (
    <div>
      <h1>Order history</h1>
      <ul style={{ listStyleType: "none" }}>{ordersComps}</ul>
    </div>
  );
};

export default OrderList;
