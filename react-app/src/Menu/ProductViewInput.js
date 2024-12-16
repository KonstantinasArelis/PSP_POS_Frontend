import { useState } from 'react';

const ProductViewInput = ({ onChange }) => {
    const [name, setName] = useState('');
    const [business_id, setBusinessId] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [is_for_sale, setIsForSale] = useState(false);
    const [tax_id, setTaxId] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [can_discount_be_applied, setCanDiscountBeApplied] = useState(false);
    const [stock_quantity, setStockQuantity] = useState('');
    const [variations, setVariations] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            business_id: business_id || null,
            price,
            type,
            is_for_sale,
            tax_id: tax_id || null,
            category_id: category_id || null,
            can_discount_be_applied,
            stock_quantity,
            variations: variations ? JSON.parse(variations) : null
        };

        try {
            const response = await fetch("http://localhost:5274/Product/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                console.log("Product created successfully!");
                window.location.reload();
            } else {
                console.error("Failed to create product");
            }
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Product Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br/>

            <label>Price:</label>
            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            /><br/>

            <label>For Sale:</label>
            <select
                value={is_for_sale}
                onChange={(e) => setIsForSale(e.target.value === "true")}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br/>

            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductViewInput;
