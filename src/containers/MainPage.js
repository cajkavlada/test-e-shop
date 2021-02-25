import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Order from "./orders/Order";
import OrderList from "./orders/OrderList";
import NewOrder from "./orders/NewOrder";
import Customers from "./customers/Customers";
import Toolbar from "../components/Toolbar";

const CustomerDashboard = (props) => {
  const [customer, setCustomer] = useState(25);

  let history = useHistory()

  const pickCustomerHandler = (customerId) => {
    setCustomer(customerId);
    history.push({pathname: '/order-list'});
  };

  let routes = (
    <Switch>
      <Route
        path="/order-list"
        render={() => <OrderList customer={customer} />}
      />
      <Route
        path="/new-order"
        render={() => <NewOrder customer={customer} />}
      />
      <Route path="/order/:id" component={Order} />
      <Route
        path="/"
        render={() => <Customers pickCustomer={pickCustomerHandler} />}
      />
    </Switch>
  );

  return (
    <>
      <Toolbar />
      {routes}
    </>
  );
};

export default CustomerDashboard;
