import './Order.css';
import {useState } from "react";

const OrderList = ({props}) => {
    
    const [orders, apiurl] = props;
    
    console.log(orders);
    console.log("url is: " + apiurl);
    return(
        <div>
            {orders.map(order =>(
                <Order order={order}/>
            ))}
        </div>
    );
}

const Order = ({order}) => {
    console.log(order.id);
    
    const [existent, SetExistent] = useState(true);
    
    function deleteOrder() {
        var del = "http://localhost:5274/Order/" + order.id;
        fetch(del, {method: "DELETE"});
        SetExistent(false);
        console.log("done");
    }
    
    return(existent ?
        <div className="order" key={order.id}>
            <div className="column1">
                <p>id: {order.id}</p>
                <p>total amount: {order.total_amount}</p>
                <p>total discount amount: {order.total_discount_amount}</p>
                <p>order status: {order.order_status}</p>
                <p>created at: {new Date(order.created_at).toLocaleDateString("LT")}</p>
            </div>
            <div className="column2">
                <button >edit</button>
                <button onClick={() => deleteOrder()}>delete</button>
            </div>
        </div> 
        : null
    )
}

export default OrderList;

/*                    <p>business_id: {order.business_id}</p>
                    <p>employee_id: {order.employee_id}</p>
                    <p>order_discount_percentage: {order.order_discount_percentage}</p>
                    <p>tax_amount: {order.tax_amount}</p>
                    
                    <p>closed_at: {order.closed_at}</p>*/