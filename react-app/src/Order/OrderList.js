import './Order.css';
import {useState } from "react";
import {Link} from "react-router-dom";

const OrderList = ({props}) => {
    
    const [orders, apiurl] = props;
    
    console.log(orders);
    console.log("url is: " + apiurl);
    return(
        <div>
            {orders.map(order =>(
                <Order props={[order, apiurl]} key={order.id}/>
            ))}
        </div>
    );
}

const Order = ({props}) => {    
    const [order, apiurl] = props;
    const [existent, setExistent] = useState(true);
    
    function deleteOrder() {
        var del = apiurl + order.id;
        fetch(del, {method: "DELETE"});
        setExistent(false);
        console.log("done");
    }
    
    return(existent ?
        <div className="order">
            <div className="column1">
                <p>id: {order.id}</p>
                <p>total amount: {order.total_amount}</p>
                <p>total discount amount: {order.total_discount_amount}</p>
                <p>order status: {order.order_status}</p>
                <p>created at: {order.created_at == null ? null : new Date(order.created_at).toLocaleDateString("LT")}</p>
            </div>
            <div className="column2">
                <Link to={"/Orders/" + order.id}><button>open</button></Link>
                <button onClick={order.order_status != "CLOSED" ? () => deleteOrder() : null}>delete</button>
            </div>
        </div> 
        : null
    )
}

export default OrderList;