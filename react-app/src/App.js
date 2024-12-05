import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Menu from './Menu';
import Business from './Business/Business';
import Reservations from './Reservations';
import Surcharges from './Surcharges';
import Taxes from './Taxes';
import Discounts from './Discounts';
import Users from './Users';
import Orders from './Order/Orders';
import OrderView from './Order/OrderView';
import OrderItemView from './Order/OrderItemView';
import CreateReservation from './CreateReservation';
import './App.css';
import Payment from './Payment/Payment';

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

function App() {
  //window.electronAPI.doThing();
  console.log("hello from app.js")
  return (
    <Router>
      <div className="App" >
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/Menu">
              <Menu />
            </Route>
            <Route path="/Business">
              <Business />
            </Route>
            <Route path="/Reservations">
              <Reservations />
            </Route>
            <Route path="/Users">
              <Users />
            </Route>
            <Route path="/Taxes">
              <Taxes />
            </Route>
            <Route path="/Surcharges">
              <Surcharges />
            </Route>
            <Route path="/Discounts">
              <Discounts />
            </Route>
            <Route exact path="/Orders">
              <Orders />
            </Route>
            <Route exact path="/Orders/:id">
              <OrderView />
            </Route>
            <Route path="/Orders/:orderId/Item/:itemId">
              <OrderItemView />
            </Route>
            <Route path="/CreateReservation">
              <CreateReservation />
            </Route>
            <Route path="/Payment/:id">
              <Payment />
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
