import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';


const DiscountView = () => {
    console.log("loading discountView component");
    var userId = 1; //TODO: find out what the user's id is and insert it here // is it needed for discounts???
    const params = useParams();
    const apiurl = "http://localhost:5274/Discount/";
    const discountUrl = apiurl + params.id;
    const { error, isPending, data: discount } = useFetch(discountUrl);

    return( // 3rd line inside div is not for discounts
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {discount && (userId == discount.business_id ? <Discount props={[discount, apiurl]}/> : <NotFound/>)} 
        </div>
    )
}

const Discount = ({props}) => {
    const [discount, apiurl] = props; //apiurl is not needed
    return(
        <div className="fullDiscount">
            <div>
                <p>id: {discount.id}</p>
                <p>business id: {discount.business_id}</p>
                <p>product id: {discount.product_id}</p>
                <p>discount type: {discount.discount_type}</p>
                <p>amount: {discount.amount}</p>
                <p>discount percentage: {discount.discount_percentage}</p>
                <p>valid from: {new Date(discount.valid_from).toLocaleDateString("LT")}</p>            
                <p>valid until: {new Date(discount.valid_until).toLocaleDateString("LT")}</p>            
                <p>code hash: {discount.code_hash}</p>
            </div>        
        </div>
    ) 
}

export default DiscountView