import React, { useState } from "react";
import ProductCreationForm from "./ProductCreationForm";

const ProductManager = () => {
    const [showForm, setShowForm] = useState(false);

    const handleCreateProduct = (newProduct) => {
        console.log("Created product:", newProduct);
    };

    return (
        <div style={styles.container}>
            <h2>Product Manager</h2>
            <button style={styles.createButton} onClick={() => setShowForm(true)}>
                Create Product
            </button>
            {showForm && (
                <ProductCreationForm
                    onClose={() => setShowForm(false)}
                    onCreate={handleCreateProduct}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Ensure elements are in a column
        justifyContent: 'space-between', // Allows title and button to be in their own spaces
        alignItems: 'flex-start', // Aligns the title to the start
        padding: '10px',
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        alignSelf: 'flex-start', // Ensures the button is aligned to the start of the container
    },
};

export default ProductManager;
