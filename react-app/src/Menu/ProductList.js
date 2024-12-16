import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div>
            <h2>Product List:</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price} - {product.is_for_sale ? "For Sale" : "Not for Sale"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
