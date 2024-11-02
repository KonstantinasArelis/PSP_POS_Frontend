import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await window.electronAPI.getOrdersFrontend();
      setOrders(orders);
    };

    fetchOrders();
  }, []);

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          Order ID: {order.id}, Total: {order.total_amount}
        </li>
      ))}
    </ul>
  );
}


function App() {
  window.electronAPI.doThing();
  console.log("hello from app.js")
  return (
    <OrderList></OrderList>
  );
}

export default App;
