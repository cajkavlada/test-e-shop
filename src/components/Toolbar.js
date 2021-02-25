import React from "react";
import {Link} from 'react-router-dom'
import styles from './Toolbar.module.css'

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
      <Link className={styles.NavItem} to="/order-list">Order List</Link>
      <Link className={styles.NavItem} to="/new-order">New Order</Link>
      <Link className={styles.NavItem} to="/">Pick Customer</Link>
    </header>
  );

export default Toolbar;