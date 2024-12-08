import DiscountList from "./DiscountList";
import DiscountViewInput from "./DiscountViewInput";
import useFetch from "../useFetch";
import {useState } from "react";

const Discounts = () => {
    const [url, SetUrl] = useState("http://localhost:5274/Discount");
    console.log("the fetched url is " + url);
    const { error, isPending, data: discounts } = useFetch(url);

    const handleUrlChange = (newUrl) => {
        SetUrl("http://localhost:5274/Discount/" + newUrl);
    }

    async function createDiscount(){
        var discount = newDiscount;
        //newDiscount.employee_id = userId; // not suitable for discount, why is it even as it is?
        var serializedDiscount = JSON.stringify(JSON.stringify(discount));
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        console.log(serializedDiscount);
        const response = await fetch("http://localhost:5274/Discount/", {method:"POST", body:serializedDiscount, headers:headers});
        if(response.ok){
            const createdDiscount = await response.json();
            window.location.href = window.location.href + "/" + createdDiscount.id;
        }
    }

    return( // deleted "<button onClick={createDiscount}>Create Discount</button>" after <div>
        <div>
            <h2>Discounts:</h2>
            <DiscountViewInput onChange={handleUrlChange}></DiscountViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {discounts && <DiscountList props={[discounts, "http://localhost:5274/Discount/"]}></DiscountList>}
            
        </div>
    );
}

const newDiscount = {
    business_id:null, 
    product_id:null, 
    discount_type:null, 
    amount:0, 
    discount_percantage:0, 
    valid_from: new Date(),
    valid_until: new Date(),
    code_hash:null
}

export default Discounts;