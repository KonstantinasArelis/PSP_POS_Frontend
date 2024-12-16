import React from "react";

const ProductCard = ({ product, onDelete }) => {
    if (!product) {
        return <p>No product data available</p>;
    }

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{product.productName}</h2>
            <p><strong>Product Id:</strong> {product.id}</p>
            <p><strong>Type:</strong> {product.productType}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stockQuantity ? "Available" : "Out of Stock"}</p>
            <p><strong>Category ID:</strong> {product.categoryId}</p>
            <p><strong>For Sale:</strong> {product.isForSale ? "Yes" : "No"}</p>
            <p><strong>Discount Applicable:</strong> {product.canDiscountBeApplied ? "Yes" : "No"}</p>
            <p><strong>Tax ID:</strong> {product.taxId}</p>
            <p><strong>Variations:</strong> {product.variations}</p>
            <button
                onClick={() => onDelete(product.id)} // Pass product ID to onDelete
                style={styles.deleteButton}
            >
                Delete
            </button>
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        color: "#333",
        fontSize: "24px",
        marginBottom: "12px",
    },
    deleteButton: {
        marginTop: "12px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#FF4D4F",
        color: "#fff",
        cursor: "pointer",
    },
};

export default ProductCard;
