import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Point Of Sale</h1>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/Orders">Orders</Link>
        <Link to="/Reservations">Reservations</Link>
        <Link to="/Users">Users</Link>
        <Link to="/Merchant">Merchant</Link>
        <Link to="/Menu">Menu</Link>
        <Link to="/Discounts">Discounts</Link>
        <Link to="/Taxes">Taxes</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;