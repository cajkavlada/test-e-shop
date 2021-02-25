import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import styles from "./NewOrder.module.css";

const NewOrder = (props) => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  let history = useHistory();

  useEffect(() => {
    axios
      .get("/items.json")
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error), []);
  }, []);

  useEffect(() => {
    setFinalPrice((finalPrice) =>
      order
        .map((item) => items[item.item].price * item.quantity)
        .reduce((a, b) => a + b, 0)
    );
  }, [order, items]);

  const changeQuantityHandler = (event, itemId) => {
    const filteredOrder = order.filter((item) => item.item !== itemId);
    if (event.target.value > 0) {
      setOrder((order) => [
        ...filteredOrder,
        {
          item: itemId,
          name: items[itemId].name,
          quantity: event.target.value,
        },
      ]);
    } else {
      setOrder((order) => filteredOrder);
    }
  };

  const SubmitOrderHandler = () => {
    const fullOrder = {
      customer: props.customer + "",
      price: finalPrice,
      items: order,
    };
    axios
      .post("/orders.json", fullOrder)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    console.log(history);
    history.push({ pathname: "/order-list" });
  };

  let itemComps = Object.keys(items).map((item) => (
    <li style={{ listStyleType: "none" }} key={item}>
      <span className={styles.Controls}>
        <label>{items[item].name}</label>
        <input
          type="number"
          onChange={(event) => changeQuantityHandler(event, item)}
        ></input>
        <label>Price: {items[item].price}$</label>
      </span>
    </li>
  ));

  return (
    <div>
      <h1>New Order</h1>
      <ul>{itemComps}</ul>
      <p>Total price: {finalPrice}$</p>
      <button onClick={SubmitOrderHandler}>SUBMIT</button>
    </div>
  );
};

export default NewOrder;
