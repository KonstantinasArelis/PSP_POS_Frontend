import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';


const TaxView = () => {
    console.log("loading taxView component");
    //var userId = 1; //TODO: find out what the user's id is and insert it here // is it needed for taxes??? // is user id used in order to display the orders of a specific user (employee)??
    const params = useParams();
    const apiurl = "http://localhost:5274/Tax/";
    const taxUrl = apiurl + params.id;
    const { error, isPending, data: tax } = useFetch(taxUrl);

    return( // 3rd line inside div is not for taxes ({tax && (userId == tax.business_id(??????????) ? <Tax props={[tax, apiurl]}/> : <NotFound/>)})
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {tax && <Tax props={[tax, apiurl]}/>} 
        </div>
    )
}

const Tax = ({props}) => {
    const [tax, apiurl] = props; //apiurl is not needed
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