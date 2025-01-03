import {useState} from 'react';
import useFetch from '../useFetch';
import DiscountList from './DiscountList';

const DiscountViewInput = ( {onChange}) => {

    const [isPending, SetIsPending] = useState(false);
    const [page_nr, Setpage_nr] = useState(''); 
    const [limit, Setlimit] = useState('');
    const [id, Setid] = useState('');
    const [business_id, Setbusiness_id] = useState('');
    const [product_id, Setproduct_id] = useState('');
    const [discount_name, Setdiscount_name] = useState('');
    const [discount_type, Setdiscount_type] = useState('');
    const [amount, Setamount] = useState('');
    const [discount_percentage, Setdiscount_percentage] = useState('');
    const [valid_from, Setvalid_starting_from] = useState('');
    const [valid_until, Setvalid_atleast_until] = useState('');
    const [code_hash, Setcode_hash] = useState('');
    
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("discount filtering is firing of");
        SetIsPending(true);

        const paramaters = {page_nr: page_nr, limit: limit, id: id, discount_type: discount_type, valid_from: valid_from,
            valid_until: valid_until, code_hash: code_hash}

        const validParamaters = Object.fromEntries(
            Object.entries(paramaters).filter(([_, value]) => value !== '')
        );

        const searchParamaters = new URLSearchParams(validParamaters);
        const querryParamaters = searchParamaters.toString();

        SetIsPending(false);
        onChange(querryParamaters);
        //useFetch('http://localhost:5274/Discount?${querryParamaters}');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newDiscount = {
            business_id: business_id || null,
            product_id: product_id || null,
            discount_name: discount_name || null,
            discount_type: discount_type || null,
            amount: amount || null,
            discount_percentage: discount_percentage || null,
            valid_from: valid_from || null,
            valid_until: valid_until || null,
            code_hash: code_hash || null
        };
    
        try {
            const serializedDiscount = JSON.stringify(newDiscount);
    
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const response = await fetch("http://localhost:5274/Discount/", {
                method: "POST",
                body: serializedDiscount,
                headers: headers
            });
    
            if (response.ok) {
                //const createdDiscount = await response.json();
                //window.location.href = window.location.href + "/" + createdDiscount.id;
                window.location.reload();
            } else {
                console.error("Failed to create discount. Response status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred while creating the discount:", error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Discount Name:</label>
                <input
                    type="text"
                    value={discount_name}
                    onChange={(e) => Setdiscount_name(e.target.value)}
                /><br/>

                <label>Business ID:</label>
                <input
                    type="number"
                    step="1"
                    min="0"
                    value={business_id}
                    onChange={(e) => Setbusiness_id(e.target.value)}
                /><br/>

                <label>Product ID:</label>
                <input
                    type="number"
                    step="1"
                    min="0"
                    value={product_id}
                    onChange={(e) => Setproduct_id(e.target.value)}
                /><br/>

                <label>Discount Type:</label>
                <select
                    value={discount_type}
                    onChange={(e) => Setdiscount_type(e.target.value)}
                >
                    <option value="ORDER">ORDER</option>
                    <option value="ORDER_ITEM">ORDER_ITEM</option>
                    <option value="PRODUCT">PRODUCT</option>
                </select><br/>

                <label>Amount:</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => Setamount(e.target.value)}
                /><br/>

                <label>Discount Percentage:</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={discount_percentage}
                    onChange={(e) => Setdiscount_percentage(e.target.value)}
                /><br/>

                <label>Valid From:</label>
                <input
                    type="datetime-local"
                    value={valid_from}
                    onChange={(e) => Setvalid_starting_from(e.target.value)}
                /><br/>

                <label>Valid Until:</label>
                <input
                    type="datetime-local"
                    value={valid_until}
                    onChange={(e) => Setvalid_atleast_until(e.target.value)}
                /><br/>

                <label>Code Hash:</label>
                <input
                    type="text"
                    value={code_hash}
                    onChange={(e) => Setcode_hash(e.target.value)}
                /><br/>

                {!isPending && <button type="submit">Create Discount</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
    );
}

export default DiscountViewInput;