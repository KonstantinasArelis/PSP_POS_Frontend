import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Menu from './Menu/Menu';
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
import './App.css';
import ProductManager from './Menu/ProductManager';
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
                                <Route exact path="/Orders" component={Orders} />
                                <Route exact path="/Orders/:id" component={OrderView} />
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
