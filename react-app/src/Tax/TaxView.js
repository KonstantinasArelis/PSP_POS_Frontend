import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';


const TaxView = () => {
    console.log("loading taxView component");
    const params = useParams();
    const apiurl = "http://localhost:5274/Tax/";
    const taxUrl = apiurl + params.id;
    const { error, isPending, data: tax } = useFetch(taxUrl);

    return(
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {tax && <Tax props={[tax, apiurl]}/>} 
        </div>
    )
}

const Tax = ({props}) => {
    const [tax, apiurl] = props; 
    return(
        <div className="fullTax">
            <div>
                <p>id: {tax.id}</p>
                <p>tax name: {tax.tax_name}</p>
                <p>tax rate: {tax.tax_rate}</p>
                <p>is valid: {tax.is_valid}</p>
            </div>        
        </div>
    ) 
}

export default TaxView