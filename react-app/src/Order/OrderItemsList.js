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
    
    const [showDiscountSelect, setShowDiscountSelect] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [showCodeField, setShowCodeField] = useState(false);
    const [codeHash, setCodeHash] = useState("");

    async function showDiscountNames(){
        if (showDiscountSelect) {
            setShowDiscountSelect(false);
            setSelectedDiscount(null);  
            setShowCodeField(false);   
        } 
        else {
            const response = await fetch("http://localhost:5274/Discount");
            if (response.ok) {
                const allDiscounts = await response.json();
                const orderItemDiscounts = allDiscounts.filter(discount => discount.discount_type === "ORDER_ITEM");
                setDiscounts(orderItemDiscounts);
                setShowDiscountSelect(true);
            }
        }
    }
    
    function applySelectedDiscount() {
        if (selectedDiscount) {
            setShowCodeField(true);
        }
    }
    
    async function validateCodeHash() {
        if (selectedDiscount && codeHash === selectedDiscount.code_hash) {
            console.log(item.id)
            const apiUrl = `http://localhost:5274/Order/${item.order_id}/orderItem/${item.id}/discountPercentage`;
           
            const body = JSON.stringify(JSON.stringify({item_discount_amount: selectedDiscount.discount_percentage}));
    
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: body,
                    headers: headers
                });
    
                if (response.ok) {
                    setShowCodeField(false);
                    setShowDiscountSelect(false);
                    setCodeHash("");
                    alert("Discount successfully applied!");
                    window.location.reload();
                } 
                else {
                    console.error("Failed to apply discount:", response.statusText);
                    alert("Error applying discount: " + response.statusText);
                }
            }
            catch (error) {
                console.error("Error occurred while applying discount:", error);
            }
    
        } 
        else {
            alert("Invalid code hash. Please try again.");
        }
    }    

    return(
        <div className="order">
            <div className="column1">
                <p>id: {item.id}</p>
                <p>product: {item.product_name}</p>
                <p>quantity: {item.quantity}</p>
                <p>product price: {item.product_price}</p>
                <p>item discount amount: {item.item_discount_amount}</p>
            </div>
            {showDiscountSelect && 
                <div>
                    <select onChange={(e) => setSelectedDiscount(discounts.find(d => d.id == e.target.value))}>
                        <option value="">Select a discount</option>
                        {discounts.map(discount => (
                            <option key={discount.id} value={discount.id}>
                                {discount.discount_name} - {discount.discount_percentage}%
                            </option>
                        ))}
                    </select>
                    <button onClick={applySelectedDiscount}>Apply Discount</button>
                </div>
            }
            {showCodeField &&
                <div>
                    <input
                        type="text"
                        placeholder="Enter code hash"
                        value={codeHash}
                        onChange={(e) => setCodeHash(e.target.value)}
                    />
                    <button onClick={validateCodeHash}>Validate Code</button>
                </div>
            }
            <div className="column2">
                <Link to={"/Orders/" + item.order_id + "/Item/" + item.id}><button>open</button></Link>
                <button onClick={editable ? () => removeItem(item) : null}>delete</button>
                <button onClick={showDiscountNames}>show/hide discounts</button>
            </div>
        </div>
    );
}

export default OrderItemsList;