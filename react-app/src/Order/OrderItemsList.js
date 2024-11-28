import './Order.css';
import {useState } from "react";
import {Link} from "react-router-dom";

const OrderItemsList = ({props}) => {
    
    const [items, editable, removeItem] = props;
    
    return(
        <div>
            {items.map(item =>(
                <OrderItem props={[item, editable, removeItem]} key={item.id}/>
            ))}
        </div>
    );
}

const OrderItem = ({props}) => {
    const [item, editable, removeItem] = props;

    return(
        <div className="order">
            <div className="column1">
                <p>id: {item.id}</p>
                <p>product: {item.product_name}</p>
                <p>quantity: {item.quantity}</p>
                <p>product price: {item.product_price}</p>
                <p>item discount amount: {item.item_discount_amount}</p>
            </div>
            <div className="column2">
                <Link to={"/Orders/" + item.order_id + "/Item/" + item.id}><button>open</button></Link>
                <button onClick={editable ? () => removeItem(item) : null}>delete</button>
            </div>
        </div>
    );
}

export default OrderItemsList;