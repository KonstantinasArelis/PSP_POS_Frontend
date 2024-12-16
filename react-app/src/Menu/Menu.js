
import React from "react";
import ProductManager from "./ProductManager";
import ProductGallery from "./ProductGallery";

const Menu = () => {
    return (
        <div>
            <h1>Menu</h1>
            <ProductManager />
            <ProductGallery />
        </div>
    );
};

export default Menu;

const ProductModel = {
    id: null,                
    product_name: null,   
    business_id: null,       
    price: 0.0,           
    product_type: null, //ProductType (e.g., "SERVICE", "ITEM")
    is_for_sale: false,
    tax_id: null,
    category_id: null,
    can_discount_be_applied: false,
    stock_quantity: false,
    variations: null
};

const newProduct = {
    ...ProductModel,
    product_name: "Džemperiuksas",
    business_id: 1,
    price: 19.99,
    product_type: "ITEM",
    is_for_sale: true,
    tax_id: 2,
    category_id: 1,
    can_discount_be_applied: true,
    stock_quantity: true,
    variations: "Color: Red, Size: Medium"
};

