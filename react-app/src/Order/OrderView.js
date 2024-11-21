import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import OrderItemsList from "./OrderItemsList";
import NotFound from '../NotFound';


const OrderView = () => {
    console.log("loading orderview component");
    var userId = 1; //TODO: find out what the user's id is and insert it here
    const params = useParams();
    const apiurl = "http://localhost:5274/Order/";
    const orderUrl = apiurl + params.id;
    const { error, isPending, data: order } = useFetch(orderUrl);
    //const [order, SetOrder] = useState(orderData);
    //console.log(order);
    return(
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {order && (userId == order.employee_id ? <Order props={[order, apiurl]}/> : <NotFound/>)}
        </div>
    )
}

const Order = ({props}) => {
    const [order, apiurl] = props;
    return(
        <div className="fullOrder">
            <div>
                <p>id: {order.id}</p>
                <p>business id: {order.business_id}</p>
                <p>employee id: {order.employee_id}</p>
                <p>total amount: {order.total_amount}</p>
                <p>tax amount: {order.tax_amount}</p>
                <p>order discount percentage: {order.order_discount_percentage}</p>
                <p>total discount amount: {order.total_discount_amount}</p>
                <p>order status: {order.order_status}</p>
                <p>created at: {new Date(order.created_at).toLocaleDateString("LT")}</p>            
                <p>closed at: {new Date(order.closed_at).toLocaleDateString("LT")}</p>
            </div>
            <div>
                <h1>Items</h1>
                <OrderItemsList props={[order.items, apiurl + order.id + "/OrderItem/"]}/>
            </div>            
        </div>
    ) 
}

export default OrderView

/*<div className="column2">
                <button >edit</button>
                <button onClick={() => deleteOrder()}>delete</button>
            </div>*/