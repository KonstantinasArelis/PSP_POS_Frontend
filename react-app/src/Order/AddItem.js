import { useState } from "react";
import useFetch from "../useFetch";

const AddItem = ({props}) => {
    const [addItem, apiUrl] = props;
    const { error, isPending, data: fetchedProducts } = useFetch(apiUrl + "Menu");
    const [product, setProduct] = useState(0);
    const [quantityString, setQuantityString] = useState("");
    
    function addItemSubmit(e){
        e.preventDefault();
        const quantity = parseInt(quantityString);
        if(!isNaN(quantity) && product != 0){
            const newItem = {
                order_id:null, product_id:product, quantity:quantity, variations:[]
            };
            addItem(newItem);
        }
    }

    return(
        <div>
            {error && <div>Products not found</div>}
            {isPending && <div>Loading...</div>}
            {fetchedProducts && 
                <form onSubmit={addItemSubmit}>
                    <label>product: </label>
                    <select value={product} onChange={e => setProduct(e.target.value)}>
                        <option value="0">-</option>
                        {fetchedProducts.map(product => (
                            <option key={product.id} value={product.id}>{product.productName}</option>
                        ))}
                    </select>
                    <label>quantity: </label>
                    <input type="text" required onChange={e => setQuantityString(e.target.value)}/>
                    <input type="submit" value="Add"/>
                </form>
            }
        </div>
    )
}

export default AddItem;
            