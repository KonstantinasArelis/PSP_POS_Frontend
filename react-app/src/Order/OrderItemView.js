import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';
import EditItem from "./EditItem";


const OrderItemView = () => {
    console.log("loading orderitemview component");
    var userId = 1; //TODO: find out what the user's id is and insert it here
    const params = useParams();
    const apiurl = "http://localhost:5274/Order/";
    const itemUrl = apiurl + params.orderId + "/orderItem/" + params.itemId;
    const orderUrl = apiurl + params.orderId;
    console.log("item url: " + itemUrl);
    const { error, isPending, data: item } = useFetch(itemUrl);
    const { errorO, isPendingO, data: order } = useFetch(orderUrl);
    return(
        <div>
            {(error || errorO) && <NotFound/>}
            {(isPending || isPendingO) && <div>Loading...</div>}
            {item && order && (userId == order.employee_id && item.order_id == order.id ? <Item props={[item, order, itemUrl]}/> : <NotFound/>)}
        </div>
    )
}

const Item = ({props}) => {
    const [item, order, itemUrl] = props;
    const variations = JSON.parse(item.variations);
    const [quantity, setQuantity] = useState(item.quantity);
    const [variationList, setVariationList] = useState(variations);
    var variationIndex = 0;
    console.log(variationList);
    
    async function deleteYourself(){
        const response = await fetch(itemUrl, {method: "DELETE"});
        console.log(response.status);
        window.location.href = window.location.href.replace("/Item/" + item.id, "");
    }

    async function changeQuantity(newQuantity) {
        const isOk = await updateItem(newQuantity, variationList);
        if(isOk) setQuantity(newQuantity);
    }
    
    async function addVariation(variation) {
        console.log("addvar " + JSON.stringify(variation));
        const newVariationList = [...variationList, variation];
        const isOk = await updateItem(quantity, newVariationList);
        if(isOk){
            setVariationList(newVariationList);
            console.log("setting vars " + JSON.stringify(variationList));
        } 
    }

    async function removeVariation(variation) {
        const index = variationList.indexOf(variation);
        console.log("remove " + JSON.stringify(variation) + " from " + JSON.stringify(variationList));
        if(index > -1){
            const newVariationList = structuredClone(variationList);
            newVariationList.splice(index, 1);
            const isOk = await updateItem(quantity, newVariationList);
            if(isOk) setVariationList(newVariationList);
        }
        else console.log("not foung");
    }

    async function updateItem(newQuantity, newVariationList) {
        const updateObject = {quantity:newQuantity, variations:newVariationList};
        const body = JSON.stringify(JSON.stringify(updateObject));
        console.log(body);
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
                <p>quantity: {quantity}</p>
                <p>product name: {item.product_name}</p>
                <p>product price: {item.product_price}</p>
                <p>discount amount: {item.item_discount_amount}</p>
                <p>variation price: {item.variation_price}</p>
            </div>
            { order.order_status != "CLOSED" &&
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
                            <td/>
                        </tr>
                    </thead>
                    <tbody>
                        {variationList.map(variation => (
                        <tr key={variationList.indexOf(variation)}>
                            <td>{variation.name}</td>
                            <td>{variation.price}</td>
                            <td><button onClick={() => removeVariation(variation)}>remove</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { order.order_status != "CLOSED" &&
                <EditItem props={[changeQuantity, addVariation]}/>
            }   
        </div>
    ) 
}

export default OrderItemView