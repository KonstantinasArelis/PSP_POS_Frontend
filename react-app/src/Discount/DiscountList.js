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
    
    return(existent ? // should I specify business_id and product_id???
        <div className="discount">
            <div className="column1">
                <p>id: {discount.id}</p>
                <p>discount type: {discount.discount_type}</p>
                <p>amount: {discount.amount}</p>
                <p>discount percantage: {discount.discount_percantage}</p>
                <p>valid from: {new Date(discount.valid_from).toLocaleDateString("LT")}</p>
                <p>valid untill: {new Date(discount.valid_until).toLocaleDateString("LT")}</p>
                <p>code hash: {discount.code_hash}</p>
            </div>
            <div className="column2">
                <Link to={"/Discounts/" + discount.id}><button>open</button></Link>
                <button onClick={() => deleteDiscount()}>delete</button>
            </div>
        </div> 
        : null
    )
}

export default DiscountList;