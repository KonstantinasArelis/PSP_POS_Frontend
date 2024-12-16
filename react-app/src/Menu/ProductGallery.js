import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductGallery = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const apiUrl = "http://localhost:5274/menu"; // Adjust the URL as needed

            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                    setLoading(false);
                } else {
                    setError(`Error: ${response.status}`);
                    setLoading(false);
                }
            } catch (err) {
                setError(`Error fetching products: ${err.message}`);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures it only runs once on mount

    const deleteProduct = async (productId) => {
        const deleteUrl = `http://localhost:5274/menu/${productId}`;

        try {
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Remove the product from the state after successful deletion
                setProducts(products.filter((product) => product.id !== productId));
                console.log(`Product with ID ${productId} deleted successfully`);
            } else {
                console.error(`Failed to delete product: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting product: ${error.message}`);
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.gallery}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
            ))}
        </div>
    );
};

const styles = {
    gallery: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
        padding: "16px",
    },
};

export default ProductGallery;
