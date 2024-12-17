import TaxList from "./TaxList";
import TaxViewInput from "./TaxViewInput";
import useFetch from "../useFetch";
import {useState } from "react";

const Taxes = () => {
    const [url, SetUrl] = useState("http://localhost:5274/Tax");
    console.log("the fetched url is " + url);
    const { error, isPending, data: taxes } = useFetch(url);

    const handleUrlChange = (newUrl) => {
        SetUrl("http://localhost:5274/Tax/" + newUrl);
    }

    async function createTax(){
        var tax = newTax;
        var serializedTax = JSON.stringify(JSON.stringify(tax));
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        console.log(serializedTax);
        const response = await fetch("http://localhost:5274/Tax/", {method:"POST", body:serializedTax, headers:headers});
        if(response.ok){
            const createdTax = await response.json();
            window.location.href = window.location.href + "/" + createdTax.id;
        }
    }

    return( // deleted "<button onClick={createTax}>Create Tax</button>" after <div>
        <div>
            <h2>Taxes:</h2>
            <TaxViewInput onChange={handleUrlChange}></TaxViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {taxes && <TaxList props={[taxes, "http://localhost:5274/Tax/"]}></TaxList>}
            
        </div>
    );
}

const newTax = {
    tax_name:null, 
    tax_rate:null, 
    is_valid:null
}

export default Taxes;