// import Navbar from './Navbar';
// import Dashboard from './Dashboard';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NotFound from './NotFound';
// import Menu from './Menu';
// import Business from './Business/Business';
// import Reservations from './Reservations';
// import Taxes from './Tax/Taxes';
// import Discounts from './Discount/Discounts';
// import DiscountView from './Discount/DiscountView';
// import Users from './Users';
// import Orders from './Order/Orders';
// import OrderView from './Order/OrderView';
// import OrderItemView from './Order/OrderItemView';
// import CreateReservation from './CreateReservation';
// import './App.css';
// import Payment from './Payment/Payment';

/*
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
*/

// function App() {
//   //window.electronAPI.doThing();
//   console.log("hello from app.js")
//   return (
//     <Router>
//       <div className="App" >
//         <Navbar />
//         <div className="content">
//           <Switch>
//             <Route exact path="/">
//               <Dashboard />
//             </Route>
//             <Route path="/Menu">
//               <Menu />
//             </Route>
//             <Route path="/Business">
//               <Business />
//             </Route>
//             <Route path="/Reservations">
//               <Reservations />
//             </Route>
//             <Route path="/Users">
//               <Users />
//             </Route>
//             <Route path="/Taxes">
//               <Taxes />
//             </Route>
//             <Route exact path="/Discounts">
//               <Discounts />
//             </Route>
//             <Route exact path="/Orders">
//               <Orders />
//             </Route>
//             <Route exact path="/Orders/:id">
//               <OrderView />
//             </Route>
//             <Route path="/Orders/:orderId/Item/:itemId">
//               <OrderItemView />
//             </Route>
//             <Route path="/CreateReservation">
//               <CreateReservation />
//             </Route>
//             <Route path="/Payment/:id">
//               <Payment />
//             </Route>
//             <Route path="*">
//               <NotFound/>
//             </Route>
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Use Switch instead of Routes
import NotFound from './NotFound';
import Menu from './Menu';
import Business from './Business/Business';
import Reservations from './Reservations';
import Taxes from './Tax/Taxes';
import Discounts from './Discount/Discounts';
import DiscountView from './Discount/DiscountView';
import Users from './Users';
import Orders from './Order/Orders';
import OrderView from './Order/OrderView';
import OrderItemView from './Order/OrderItemView';
import CreateReservation from './CreateReservation';
import Payment from './Payment/Payment';
import Login from "./Login/Login";

import { useState } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove auth token on logout
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                {isAuthenticated ? (
                    <>
                        <Navbar onLogout={handleLogout} />
                        <div className="content">
                            <Switch>  {/* Use Switch here */}
                                <Route exact path="/" component={Dashboard} />
                                <Route path="/Menu" component={Menu} />
                                <Route path="/Business" component={Business} />
                                <Route path="/Reservations" component={Reservations} />
                                <Route path="/Users" component={Users} />
                                <Route path="/Taxes" component={Taxes} />
                                <Route path="/Discounts" component={Discounts} />
                                <Route path="/Orders" component={Orders} />
                                <Route path="/Orders/:id" component={OrderView} />
                                <Route path="/Orders/:orderId/Item/:itemId" component={OrderItemView} />
                                <Route path="/CreateReservation" component={CreateReservation} />
                                <Route path="/Payment/:id" component={Payment} />
                                <Route component={NotFound} />  {/* This is the 404 route */}
                            </Switch>
                        </div>
                    </>
                ) : (
                    <Login onLogin={handleLogin} /> // Show Login component when not authenticated
                )}
            </div>
        </Router>
    );
}

export default App;
