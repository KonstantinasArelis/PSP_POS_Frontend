import './Discount.css';
import {useState} from "react";
import {Link} from "react-router-dom";

const DiscountList = ({props}) => {
    
    const [discounts, apiurl] = props;
    
    console.log(discounts);
    console.log("url is: " + apiurl);
    return(
        <div>
            {discounts.map(discount =>(
                <Discount props={[discount, apiurl]} key={discount.id}/>
            ))}
        </div>
    );
}

const Discount = ({props}) => {    
    const [discount, apiurl] = props;
    const [existent, setExistent] = useState(true);
    
    function deleteDiscount() {
        var del = apiurl + discount.id;
        fetch(del, {method: "DELETE"});
        setExistent(false);
        console.log("done");
    }
    
    return(existent ? // should I specify business_id and product_id??? //deleted "<Link to={"/Discounts/" + discount.id}><button>open</button></Link>" after <div className="column2">
        <div className="discount">
            <div className="column1">
                <p>id: {discount.id ?? "null"}</p>
                <p>business id: {discount.business_id ?? "null"}</p>
                <p>product id: {discount.product_id ?? "null"}</p>
                <p>discount type: {discount.discount_type ?? "null"}</p>
                <p>amount: {discount.amount ?? "null"}</p>
                <p>discount percentage: {discount.discount_percentage ?? "null"}</p>
                <p>valid from: {discount.valid_from ? new Date(discount.valid_from).toLocaleDateString("LT") : "null"}</p>
                <p>valid until: {discount.valid_until ? new Date(discount.valid_until).toLocaleDateString("LT") : "null"}</p>
                <p>code hash: {discount.code_hash ?? "null"}</p>
            </div>
            <div className="column2">
                <button onClick={() => deleteDiscount()}>delete</button>
            </div>
        </div> 
        : null
    )
}

export default DiscountList;