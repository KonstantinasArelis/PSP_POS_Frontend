import React from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
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
            <div style={styles.buttonContainer}>
                <button style={styles.editButton} onClick={() => onEdit(product)}>
                    Edit
                </button>
                <button style={styles.deleteButton} onClick={() => onDelete(product.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
};

export default ProductCard;
