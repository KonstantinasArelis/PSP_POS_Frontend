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

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        tax_name: tax.tax_name || "",
        tax_rate: tax.tax_rate || "",
        is_valid: tax.is_valid ?? "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "is_valid" ? value === "true" : value,
        });
    };

    const handleSubmit = async () => {
        const patchUrl = `${apiurl}${tax.id}`;
        const body = JSON.stringify({
            id:tax.id,
            ...(formData.tax_name && { tax_name: formData.tax_name }),
            ...(formData.tax_rate && { tax_rate: parseFloat(formData.tax_rate).toFixed(4) }),
            ...(formData.is_valid !== "" && { is_valid: formData.is_valid }),
        });

        try {
            const response = await fetch(patchUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            if (response.ok) {
                const updatedTax = await response.json();
                setIsEditing(false);
                console.log("Updated successfully:", updatedTax);
                window.location.reload();
            } 
            else {
                console.error("Failed to update tax.");
            }
        } 
        catch (error) {
            console.error("Error while sending PATCH request:", error);
        }
    };

        // according to the .yaml file, delete function is not considered
    // function deleteTax() {
    //     var del = apiurl + tax.id;
    //     fetch(del, {method: "DELETE"});
    //     setExistent(false);
    //     console.log("done");
    // }
    
    return (
        existent ? (
            <div className="tax">
                {isEditing ? (
                    <div className="edit-form">
                        <h3>Edit Tax</h3>
                        <div>
                            <label>Tax Name:</label>
                            <input
                                type="text"
                                name="tax_name"
                                value={formData.tax_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Tax Rate:</label>
                            <input
                                type="number"
                                step="0.0001"
                                name="tax_rate"
                                value={formData.tax_rate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Is Valid:</label>
                            <select
                                name="is_valid"
                                value={formData.is_valid}
                                onChange={handleInputChange}
                            >
                                <option value="">--Select--</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <button onClick={handleSubmit}>Apply Changes</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <p>id: {tax.id ?? "null"}</p>
                        <p>tax name: {tax.tax_name ?? "null"}</p>
                        <p>tax rate: {tax.tax_rate ?? "null"}</p>
                        <p>is valid: {tax.is_valid === null || tax.is_valid === undefined ? "null" : tax.is_valid.toString()}</p>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </>
                )}
            </div>
        ) : null
    );
}

export default TaxList;