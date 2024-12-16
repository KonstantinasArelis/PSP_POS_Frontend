import React, { useState } from "react";

const ProductEditForm = ({ product, onClose, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedProduct);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.formContainer}>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Product Name:
                        <input
                            type="text"
                            name="productName"
                            value={updatedProduct.productName}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Business ID:
                        <input
                            type="number"
                            name="businessId"
                            value={updatedProduct.businessId}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Product Type:
                        <select
                            name="productType"
                            value={updatedProduct.productType}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        >
                            <option value="SERVICE">SERVICE</option>
                            <option value="ITEM">ITEM</option>
                            <option value="SERVICE_CHARGE">SERVICE_CHARGE</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Is For Sale:
                        <input
                            type="checkbox"
                            name="isForSale"
                            checked={updatedProduct.isForSale}
                            onChange={handleInputChange}
                            style={styles.checkbox}
                        />
                    </label>
                    <label style={styles.label}>
                        Tax ID:
                        <input
                            type="number"
                            name="taxId"
                            value={updatedProduct.taxId}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Category ID:
                        <input
                            type="number"
                            name="categoryId"
                            value={updatedProduct.categoryId}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Can Discount Be Applied:
                        <input
                            type="checkbox"
                            name="canDiscountBeApplied"
                            checked={updatedProduct.canDiscountBeApplied}
                            onChange={handleInputChange}
                            style={styles.checkbox}
                        />
                    </label>
                    <label style={styles.label}>
                        Stock Quantity:
                        <input
                            type="checkbox"
                            name="stockQuantity"
                            checked={updatedProduct.stockQuantity}
                            onChange={handleInputChange}
                            style={styles.checkbox}
                        />
                    </label>
                    <label style={styles.label}>
                        Variations:
                        <input
                            type="text"
                            name="variations"
                            value={updatedProduct.variations}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </label>
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.saveButton}>
                            Save Changes
                        </button>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "12px",
    },
    input: {
        marginTop: "4px",
        padding: "8px",
        fontSize: "16px",
        width: "100%",
    },
    checkbox: {
        marginTop: "8px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        padding: "10px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    cancelButton: {
        backgroundColor: "#f44336",
        color: "#fff",
        padding: "10px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default ProductEditForm;
