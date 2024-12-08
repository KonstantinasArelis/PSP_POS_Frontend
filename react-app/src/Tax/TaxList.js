import './Tax.css';
import {useState} from "react";
import {Link} from "react-router-dom";

const TaxList = ({props}) => {
    
    const [taxes, apiurl] = props;
    
    console.log(taxes);
    console.log("url is: " + apiurl);
    return(
        <div>
            {taxes.map(tax =>(
                <Tax props={[tax, apiurl]} key={tax.id}/>
            ))}
        </div>
    );
}

const Tax = ({props}) => {    
    const [tax, apiurl] = props;
    const [existent, setExistent] = useState(true);
    
        // according to the .yaml file, delete function is not considered
    // function deleteTax() {
    //     var del = apiurl + tax.id;
    //     fetch(del, {method: "DELETE"});
    //     setExistent(false);
    //     console.log("done");
    // }
    
    return(existent ? //deleted "<Link to={"/Taxes/" + tax.id}><button>open</button></Link>" after <div className="column2">
        <div className="tax">
            <p>id: {tax.id ?? "null"}</p>
            <p>tax name: {tax.tax_name ?? "null"}</p>
            <p>tax rate: {tax.tax_rate ?? "null"}</p>
            <p>is valid: {tax.is_valid === null || tax.is_valid === undefined ? "null" : tax.is_valid.toString()}</p>
        </div> 
        : null
    )
}

export default TaxList;