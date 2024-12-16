import { useState } from "react";
import useFetch from "../useFetch";

const AddItem = ({props}) => {
    const [addItem, apiurl] = props;
    const [category, setCategory] = useState(0);
    const categoryUrl = apiurl + "Categories";
    //const { error, isPending, data: fetchedCategories } = {error:false, isPending:false, data:mockCategories};
    //using mock categories since the real deal is not implemented yet
    const { error, isPending, data: fetchedCategories } = useFetch(categoryUrl);

    return(
        <div>
            {error && <div>Categories not found</div>}
            {isPending && <div>Loading...</div>}
            {fetchedCategories && 
                <form>
                    <h2>add new item:</h2>
                    <label>category: </label>
                    <select value="0" onChange={e => setCategory(e.target.value)}>
                        <option value="0">-</option>
                        {fetchedCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </form>
            }
            {category != 0 && <ProductSelect props={[apiurl + "/products/?category=" + category, addItem]}/>}
        </div>
    )
}

const ProductSelect = ({props}) => {
    const [productUrl, addItem] = props;
    const { error, isPending, data: fetchedProducts } = useFetch(productUrl);
    //const { error, isPending, data: fetchedProducts } = {error:false, isPending:false, data:mockProducts};
    //using mock products since the real deal is not implemented yet
    const [product, setProduct] = useState(0);
    const [quantityString, setQuantityString] = useState("");
    
    function addItemSubmit(e){
        e.preventDefault();
        const quantity = parseInt(quantityString);
        if(!isNaN(quantity) && product != 0){
            const selectedProduct = fetchedProducts.find(p => p.id == product);
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
                    <select value="0" onChange={e => setProduct(e.target.value)}>
                        <option value="0">-</option>
                        {fetchedProducts.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
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

/*const mockCategories = [
    {
        id:1,
        name:"aaaaaaaaa"
    }
]

const mockProducts = [
    {
        id:1,
        name:"b",
        price:999,
        category:1
    },
    {
        id:2,
        name:"bb",
        price:999,
        category:1
    }
]*/

export default AddItem;
            