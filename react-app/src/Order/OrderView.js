import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import OrderItemsList from "./OrderItemsList";
import NotFound from '../NotFound';
import AddItem from "./AddItem";

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
            {order && (userId == order.employee_id ? <Order props={[order, orderUrl]}/> : <NotFound/>)}
        </div>
    )
}

const Order = ({props}) => {
    const [order, orderUrl] = props;
    const [status, setStatus] = useState(order.order_status);
    const [items, setItems] = useState(order.items);
    const history = useHistory();

    async function deleteYourself(){
        const response = await fetch(orderUrl, {method: "DELETE"});
        console.log(response.status);
        window.location.href = window.location.href.replace("/" + order.id, "");
    }

    async function proceedToPay(){
        const targetUrl = orderUrl + "/status";
        const payStatus = JSON.stringify(JSON.stringify({status:"PENDING_PAYMENT"}));
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(targetUrl, {method:"POST", body:payStatus, headers:headers});
        if(response.ok) setStatus("PENDING_PAYMENT");
        //TODO: payment handling goes here
        history.push(`/Payment/${order.id}`);
    }

    async function addItem(item) {
        item.order_id = order.id;
        const body = JSON.stringify(JSON.stringify(item));
        console.log(body);
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(orderUrl + "/orderItem", {method:"POST", body:body, headers:headers});
        if(response.ok){
            const newItems = structuredClone(items);
            const createdItem = await response.json();
            newItems.push(createdItem);
            setItems(newItems);
        }
    }

    async function removeItem(item) {
        const index = items.indexOf(item);
        if(index > -1){
            const del = orderUrl + "/orderItem/" + item.id;
            const response = await fetch(del, {method: "DELETE"});
            if(response.ok){
                const newItems = structuredClone(items);
                newItems.splice(index, 1);
                setItems(newItems);
            }
        }
    }
    
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
                <p>order status: {status}</p>
                <p>created at: {order.created_at == null ? null : new Date(order.created_at).toLocaleDateString("LT")}</p>            
                <p>closed at: {order.closed_at == null ? null : new Date(order.created_at).toLocaleDateString("LT")}</p>
            </div>
            { status != "CLOSED" &&
                <div>
                    <button onClick={deleteYourself}>cancel order</button>
                    <button onClick={proceedToPay}>proceed to payment</button>
                </div>
            }
            <div>
                <h1>Items</h1>
                <OrderItemsList props={[items, status != "CLOSED", removeItem]}/>
            </div>
            { status != "CLOSED" && <AddItem props={[addItem, "http://localhost:5274/"]}/>}
        </div>
    ) 
}

export default OrderView