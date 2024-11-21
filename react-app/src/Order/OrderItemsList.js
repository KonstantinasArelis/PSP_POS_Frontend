import './Order.css';
import {useState } from "react";

const OrderItemsList = ({props}) => {
    
    const [items, apiurl] = props;
    
    console.log("url is: " + apiurl);
    return(
        <div>
            {items.map(item =>(
                <OrderItem props={[item, apiurl]} key={item.id}/>
            ))}
        </div>
    );
}

const OrderItem = ({props}) => {
    const [item, apiurl] = props;
    const [existent, setExistent] = useState(true);
    
    function deleteitem() {
        var del = apiurl + item.id;
        fetch(del, {method: "DELETE"});
        setExistent(false);
        console.log("done");
    }
    
    return(existent ?
        <div className="order">
            <div className="column1">
                <p>id: {item.id}</p>
                <p>product: {item.product_name}</p>
                <p>quantity: {item.quantity}</p>
                <p>product price: {item.product_price}</p>
                <p>item discount amount: {item.total_discount_amount}</p>
            </div>
            <div className="column2">
                <button>open</button>
                <button onClick={() => deleteitem()}>remove</button>
            </div>
        </div> 
        : null
    );
}

export default OrderItemsList;