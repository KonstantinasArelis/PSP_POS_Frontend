import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import OrderItemsList from "./OrderItemsList";
import NotFound from '../NotFound';


const OrderItemView = () => {
    console.log("loading orderitemview component");
    var userId = 1; //TODO: find out what the user's id is and insert it here
    const params = useParams();
    const apiurl = "http://localhost:5274/Order/";
    const itemUrl = apiurl + params.orderId + "/orderItem/" + params.itemId;
    console.log("item url: " + itemUrl);
    const { error, isPending, data: item } = useFetch(itemUrl);
    //const [item, Setitem] = useState(itemData);
    //console.log(item);
    return(
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {item && (userId == 1 ? <Item props={[item, apiurl]}/> : <NotFound/>)}
        </div>
    )
}

const Item = ({props}) => {
    const [item, apiurl] = props;
    //const [status, setStatus] = useState(item.item_status);
    
    async function deleteYourself(){
        const del = apiurl + item.id;
        const response = await fetch(del, {method: "DELETE"});
        console.log(response.status);
        window.location.href = window.location.href.replace("/" + item.id, "");
    }

    /*async function proceedToPay(){
        const targetUrl = apiurl + item.id + "/status";
        const payStatus = JSON.stringify(JSON.stringify({status:"PENDING_PAYMENT"}));
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(targetUrl, {method:"POST", body:payStatus, headers:headers});
        if(response.ok) setStatus("PENDING_PAYMENT");
        //TODO: payment handling goes here
    }*/

    async function addVariation() {
        
    }
    
    return(
        <div className="fullitem">
            <div>
                <p>id: {item.id}</p>
                <p>product id: {item.product_id}</p>
                <p>reservation id: {item.reservation_id}</p>
                <p>quantity: {item.quantity}</p>
                <p>product name: {item.product_name}</p>
                <p>product price: {item.product_price}</p>
                <p>discount amount: {item.item_discount_amount}</p>
                <p>variation price: {item.variation_price}</p>
            </div>
            <div>
                <h1>Variations</h1>
            </div>
            <div>
                <button onClick={addVariation}>add variation</button>
            </div>
        </div>
    ) 
}

export default OrderItemView

//<OrderItemsList props={[order.items, apiurl + order.id + "/OrderItem/"]}/>