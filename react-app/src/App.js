
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
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                {isAuthenticated ? (
                    <>
                        <Navbar onLogout={handleLogout} />
                        <div className="content">
                            <Switch>  
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
                                <Route component={NotFound} /> 
                            </Switch>
                        </div>
                    </>
                ) : (
                    <Login onLogin={handleLogin} /> 
                )}
            </div>
        </Router>
    );
}

export default App;
