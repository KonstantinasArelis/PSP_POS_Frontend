import DiscountList from "./DiscountList";
import DiscountViewInput from "./DiscountViewInput";
import useFetch from "../useFetch";
import {Link} from "react-router-dom";
import {useState } from "react";

const Discounts = () => {
    const [url, SetUrl] = useState("http://localhost:5274/Discount");
    console.log("the fetched url is " + url);
    const { error, isPending, data: discounts } = useFetch(url);

    const handleUrlChange = (newUrl) => {
        SetUrl("http://localhost:5274/Discount/" + newUrl);
    }

    return(
        <div>
            <Link to="/CreateDiscount">Create Discount:</Link>
            <h2>Discounts:</h2>
            <DiscountViewInput onChange={handleUrlChange}></DiscountViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {discounts && <DiscountList props={[discounts, "http://localhost:5274/Discount/"]}></DiscountList>}
            
        </div>
    );
}

export default Discounts;