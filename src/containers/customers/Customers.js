import React, { useState, useEffect } from "react";
import axios from "../../axios";

const Customers = (props) => {
  const [customers, setCustomers] = useState({
    14: { customerId: "14", name: "George" },
  });

  useEffect(() => {
    axios
      .get("/customers.json")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  }, [props]);

  const customerTiles = Object.values(customers).map((customer) => (
    <li style={{ listStyleType: "none" }} key={customer.customerId}>
      <button onClick={() => props.pickCustomer(customer.customerId)}>
        {customer.name}
      </button>
    </li>
  ));

  return (
    <>
      <h1>Customers</h1>
      <ul>{customerTiles}</ul>
    </>
  );
};

export default Customers;
