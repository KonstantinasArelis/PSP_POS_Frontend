import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";
import NotFound from '../NotFound';


const DiscountView = () => {
    console.log("loading discountView component");
    const params = useParams();
    const apiurl = "http://localhost:5274/Discount/";
    const discountUrl = apiurl + params.id;
    const { error, isPending, data: discount } = useFetch(discountUrl);

    return( 
        <div>
            {error && <NotFound/>}
            {isPending && <div>Loading...</div>}
            {discount && <Discount props={[discount, apiurl]}/>} 
        </div>
    )
}

const Discount = ({props}) => {
    const [discount, apiurl] = props; 
    return(
        <div className="fullDiscount">
            <div>
                <p>id: {discount.id}</p>
                <p>business id: {discount.business_id}</p>
                <p>product id: {discount.product_id}</p>
                <p>discount name: {discount.discount_name}</p>
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