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

    return(
        <div>
            <Link to="/CreateOrder">Create Order:</Link>
            <h2>Orders:</h2>
            <OrderViewInput onChange={handleUrlChange}></OrderViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {orders && <OrderList props={[orders, "http://localhost:5274/Order/"]}></OrderList>}
            
        </div>
    );
}

export default Orders;