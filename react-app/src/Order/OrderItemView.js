import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';
import EditItem from "./EditItem";


const OrderItemView = () => {
    const [rerenderer, setRerenderer] = useState(0);
    var userId = localStorage.getItem("userId");
    const params = useParams();
    const apiurl = "http://localhost:5274/Order/";
    const itemUrl = apiurl + params.orderId + "/orderItem/" + params.itemId;
    const orderUrl = apiurl + params.orderId;
    const { error, isPending, data: item } = useFetch(itemUrl, rerenderer);
    const { errorO, isPendingO, data: order } = useFetch(orderUrl);

    function rerender(){
        setRerenderer(oldValue => oldValue + 1);
    }

    return(
        <div>
            {(error || errorO) && <NotFound/>}
            {(isPending || isPendingO) && <div>Loading...</div>}
            {item && order && (userId == order.employee_id && item.order_id == order.id ? <Item props={[item, order, itemUrl, rerender]}/> : <NotFound/>)}
        </div>
    )
}

const Item = ({props}) => {
    const [item, order, itemUrl, rerender] = props;
    const variations = JSON.parse(item.variations);
    
    async function deleteYourself(){
        const response = await fetch(itemUrl, {method: "DELETE"});
        window.location.href = window.location.href.replace("/Item/" + item.id, "");
    }

    async function changeQuantity(newQuantity) {
        const isOk = await updateItem(newQuantity, variations);
        if(isOk) rerender();
    }
    
    async function addVariation(variation) {
        const newVariationList = [...variations, variation];
        const isOk = await updateItem(item.quantity, newVariationList);
        if(isOk){
            rerender();
        } 
    }

    async function removeVariation(variation) {
        const index = variations.indexOf(variation);
        if(index > -1){
            const newVariationList = structuredClone(variations);
            newVariationList.splice(index, 1);
            const isOk = await updateItem(item.quantity, newVariationList);
            if(isOk){
                rerender();
            }
        }
    }

    async function updateItem(newQuantity, newVariationList) {
        const updateObject = {quantity:newQuantity, variations:newVariationList};
        const body = JSON.stringify(updateObject);
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(itemUrl, {method:"PATCH", body:body, headers:headers});
        return response.ok;
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
            { order.order_status == "OPEN" &&
                <div>
                    <button onClick={deleteYourself}>remove item</button>
                </div>
            }
            <div>
                <h1>Variations</h1>
                <table>
                    <thead>
                        <tr>
                            <td className="wideColumn">name</td>
                            <td>price</td>
                            { order.order_status == "OPEN" && <td/>}
                        </tr>
                    </thead>
                    <tbody>
                        {variations.map(variation => (
                        <tr key={variations.indexOf(variation)}>
                            <td>{variation.name}</td>
                            <td>{variation.price}</td>
                            { order.order_status == "OPEN" &&
                                <td><button onClick={() => removeVariation(variation)}>remove</button></td>
                            }
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { order.order_status == "OPEN" &&
                <EditItem props={[changeQuantity, addVariation]}/>
            }   
        </div>
    ) 
}

export default OrderItemView