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
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        discount_name: discount.discount_name || "",
        amount: discount.amount || "",
        discount_percentage: discount.discount_percentage || "",
        valid_from: discount.valid_from || "",
        valid_until: discount.valid_until || "",
        code_hash: discount.code_hash || "",
    });

    function deleteDiscount() {
        var del = apiurl + discount.id;
        fetch(del, {method: "DELETE"});
        setExistent(false);
        console.log("done");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = async () => {
        const patchUrl = `${apiurl}${discount.id}`;
        const body = JSON.stringify({
            id: discount.id,
            business_id: discount.business_id,
            product_id: discount.product_id,
            discount_name: formData.discount_name,
            discount_type: discount.discount_type,
            amount: formData.amount !== "" ? parseFloat(formData.amount) : null,
            discount_percentage:  formData.discount_percentage !== "" ? parseFloat(formData.discount_percentage) : null,
            valid_from: formData.valid_from || null,
            valid_until: formData.valid_until || null,
            code_hash: formData.code_hash,
        });

        try {
            const response = await fetch(patchUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            if (response.ok) {
                const updatedDiscount = await response.json();
                setIsEditing(false);
                console.log("Updated successfully:", updatedDiscount);
                window.location.reload();
            } 
            else {
                console.error("Failed to update discount.");
            }
        } 
        catch (error) {
            console.error("Error while sending PATCH request:", error);
        }
    };


    return (
        existent ? (
            <div className="discount">
                {isEditing ? (
                    <div className="edit-form">
                        <h3>Edit Discount</h3>
                        <div>
                            <label>Discount Name:</label>
                            <input
                                type="text"
                                name="discount_name"
                                value={formData.discount_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Amount:</label>
                            <input
                                type="number"
                                step="0.01"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Discount Percentage:</label>
                            <input
                                type="number"
                                step="0.01"
                                name="discount_percentage"
                                value={formData.discount_percentage}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Valid From:</label>
                            <input
                                type="date"
                                name="valid_from"
                                value={formData.valid_from}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Valid Until:</label>
                            <input
                                type="date"
                                name="valid_until"
                                value={formData.valid_until}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Code Hash:</label>
                            <input
                                type="text"
                                name="code_hash"
                                value={formData.code_hash}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleSubmit}>Apply Changes</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <div className="column1">
                            <p>id: {discount.id ?? "null"}</p>
                            <p>business id: {discount.business_id ?? "null"}</p>
                            <p>product id: {discount.product_id ?? "null"}</p>
                            <p>discount name: {discount.discount_name ?? "null"}</p>
                            <p>discount type: {discount.discount_type ?? "null"}</p>
                            <p>amount: {discount.amount ?? "null"}</p>
                            <p>discount percentage: {discount.discount_percentage ?? "null"}</p>
                            <p>valid from: {discount.valid_from ? new Date(discount.valid_from).toLocaleDateString("LT") : "null"}</p>
                            <p>valid until: {discount.valid_until ? new Date(discount.valid_until).toLocaleDateString("LT") : "null"}</p>
                            <p>code hash: {discount.code_hash ?? "null"}</p>
                        </div>
                        <div className="column2">
                            <button onClick={() => deleteDiscount()}>Delete</button>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    </>
                )}
            </div>
        ) : null
    );
}

export default DiscountList;