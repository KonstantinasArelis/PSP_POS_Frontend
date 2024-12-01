import { useState } from "react";

const EditItem = ({props}) => {
    const [changeQuantity, addVariation] = props;
    const [quantityString, setQuantityString] = useState("");
    const [variationString, setVariationString] = useState("");
    const [priceString, setPriceString] = useState("");

    function quantitySubmit(e){
        e.preventDefault();
        const quantity = parseInt(quantityString);
        if(!isNaN(quantity)){
            changeQuantity(quantity);
        }
    }

    function variationSubmit(e){
        e.preventDefault();
        const price = parseFloat(priceString);
        if(!isNaN(price)){
            console.log(price);
            console.log(priceString);
            const newVariation = {name:variationString, price:price};
            addVariation(newVariation);
        }
    }

    return(
        <div>
            <form onSubmit={quantitySubmit}>
                <label>change quantity: </label>
                <input type="text" required onChange={e => setQuantityString(e.target.value)}/>
                <input type="submit" value="Submit"/>
            </form>
            <form onSubmit={variationSubmit}>
                <h2>add new variation</h2>
                <label>name: </label>
                <input type="text" required onChange={e => setVariationString(e.target.value)}/>
                <label>price: </label>
                <input type="text" required onChange={e => setPriceString(e.target.value)}/>
                <input type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default EditItem;