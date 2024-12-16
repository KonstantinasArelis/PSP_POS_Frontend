import React, { useState, useEffect } from "react";
import ProductCreationForm from "./ProductCreationForm";
import ProductEditForm from "./ProductEditForm";
import ProductCard from "./ProductCard"; // Assuming you have a ProductCard component

const ProductManager = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5274/menu");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateProduct = async (newProduct) => {
        try {
            const response = await fetch("http://localhost:5274/menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                console.log("Created product:", newProduct);
                setShowForm(false);
                fetchProducts(); // Refresh products
            }
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:5274/menu/${updatedProduct.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                console.log("Product updated:", updatedProduct);
                setEditingProduct(null);
                fetchProducts(); // Refresh products
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product); // Set the product to be edited
    };

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5274/menu/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Deleted product with ID:", productId);
                fetchProducts(); // Refresh products
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
            {editingProduct && (
                <ProductEditForm
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onUpdate={handleUpdateProduct}
                />
            )}
            <div style={styles.productList}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit} // Pass handleEdit
                        onDelete={handleDelete} // Pass handleDelete
                    />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px",
    },
    createButton: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "10px",
    },
    productList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "10px",
        width: "100%",
    },
};

export default ProductManager;
