import OrderList from "./OrderList";
import OrderViewInput from "./OrderViewInput";
import useFetch from "../useFetch";
import {Link} from "react-router-dom";
import {useState } from "react";

const Orders = () => {
    var userId = 1; //TODO: find out what the user's id is and insert it here
    const [url, SetUrl] = useState("http://localhost:5274/Order?employee_id=" + userId);
    console.log("the fetched url is " + url);
    const { error, isPending, data: orders } = useFetch(url);

    const handleUrlChange = (newUrl) => {
        SetUrl("http://localhost:5274/Order/" + newUrl);
    }

    async function createOrder(){
        var order = newOrder;
        order.employee_id = userId;
        var serializedOrder = JSON.stringify(JSON.stringify(order));
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        console.log(serializedOrder);
        var res = await fetch("http://localhost:5274/Order/", {method:"POST", body:serializedOrder, headers:headers})
            .then(response => response.json());
            //.then(data => {console.log(data)});
        //var resjs = response.json();
        //console.log("body is |" +  JSON.stringify(resjs) + "|");
        window.location.href = window.location.href + "/" + res.id;
        console.log(res);
    }

    return(
        <div>
            <button onClick={createOrder}>Create Order</button>
            <h2>Orders:</h2>
            <OrderViewInput onChange={handleUrlChange}></OrderViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {orders && <OrderList props={[orders, "http://localhost:5274/Order/"]}></OrderList>}
            
        </div>
    );
}

const newOrder = {
    business_id:null, 
    employee_id:null, 
    order_disount_percentage:0, 
    total_amount:0, 
    tax_amount:0,
    total_discount_amount:0,
    order_status:"OPEN",
    created_at: new Date(),
    closed_at:null,
    items:null
}

export default Orders;