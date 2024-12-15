import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import OrderItemsList from "./OrderItemsList";
import NotFound from '../NotFound';
import AddItem from "./AddItem";

const OrderView = () => {
    const [rerenderer, setRerenderer] = useState(0);
    var userId = 1; //TODO: find out what the user's id is and insert it here
    const params = useParams();
    const apiurl = "http://localhost:5274/Order/";
    const orderUrl = apiurl + params.id;
    const { error, isPending, data: order } = useFetch(orderUrl, rerenderer);

    function rerender(){
        setRerenderer(oldValue => oldValue + 1);
    }
    
    return(
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {order && (userId == order.employee_id ? <Order props={[order, orderUrl, rerender]}/> : <NotFound/>)}
        </div>
    )
}

const Order = ({props}) => {
    const [order, orderUrl, rerender] = props;
    const [status, setStatus] = useState(order.order_status);
    const [items, setItems] = useState(order.items);    
    const [showDiscountSelect, setShowDiscountSelect] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [showCodeField, setShowCodeField] = useState(false);
    const [codeHash, setCodeHash] = useState("");

    const history = useHistory();

    async function deleteYourself(){
        const response = await fetch(orderUrl, {method: "DELETE"});
        window.location.href = window.location.href.replace("/" + order.id, "");
    }

    async function proceedToPay(){
        const targetUrl = orderUrl + "/status";
        const payStatus = JSON.stringify({status:"PENDING_PAYMENT"});
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(targetUrl, {method:"POST", body:payStatus, headers:headers});
        if(response.ok){
            rerender();
        }
        //TODO: payment handling goes here
        history.push(`/Payment/${order.id}`);
    }

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
                const orderDiscounts = allDiscounts.filter(discount => discount.discount_type === "ORDER");
                setDiscounts(orderDiscounts);
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
            console.log(order.id)
            const apiUrl = `http://localhost:5274/Order/${order.id}/discountPercentage`;
           
            const body = JSON.stringify(JSON.stringify({order_discount_percentage: selectedDiscount.discount_percentage}));
    
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

    async function addItem(item) {
        item.order_id = order.id;
        const body = JSON.stringify(item);
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(orderUrl + "/orderItem", {method:"POST", body:body, headers:headers});
        if(response.ok){
            rerender();
        }
    }

    async function removeItem(item) {
        const index = order.items.indexOf(item);
        if(index > -1){
            const del = orderUrl + "/orderItem/" + item.id;
            const response = await fetch(del, {method: "DELETE"});
            if(response.ok){
                rerender();
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
                <p>order status: {order.order_status}</p>
                <p>created at: {order.created_at == null ? null : new Date(order.created_at).toLocaleDateString("LT")}</p>            
                <p>closed at: {order.closed_at == null ? null : new Date(order.created_at).toLocaleDateString("LT")}</p>
            </div>
            { order.order_status == "OPEN" &&
                <div>
                    <button onClick={deleteYourself}>cancel order</button>
                    <button onClick={proceedToPay}>proceed to payment</button>
                    <button onClick={showDiscountNames}>show/hide discounts</button>
                </div>
            }
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
            <div>
                <h1>Items</h1>
                <OrderItemsList props={[order.items, order.order_status == "OPEN", removeItem]}/>
            </div>
            { order.order_status == "OPEN" && <AddItem props={[addItem, "http://localhost:5274/"]}/>}
        </div>
    ) 
}

export default OrderView