import React, { useState, useEffect } from "react";
import './product-cart.css';


const ProductCart = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const handleAddToCart = (event) => {
          setProducts(products => [...products, event.detail]);
      };
  
      window.addEventListener('addToCart', handleAddToCart);
  
      return () => {
          window.removeEventListener('addToCart', handleAddToCart);
      };
  }, []);
      
    const renderProducts =  () => {
        if (products.length === 0) {
          return <div className="cart-container"><p>Your cart is empty</p></div>;
        }
        return <div className="cart-container">
          {products.map(renderProduct()) }
          {renderProductsTotal()}
        </div>;
      }

    const renderProduct = () => (product, index) => {
        return <div className="cart-item" key={index}>
                  <span className='cart-item-name'>{product.name}</span>
                  <span className='cart-item-price'>&#x20b9;{product.price}</span>

          </div>;
      }

      const renderProductsTotal =  () => {
        const total = products.reduce((sum, product) => sum + product.price, 0);
        return <div className="cart-total">
                <span className='cart-item-name'>Total</span>
                <span className='cart-item-price'>&#x20b9;{total}</span>
        </div>;
      }

    return (<div className="product-cart-container">
        {/* <h3>Cart</h3> */}
        { renderProducts() }
    
    </div>)
    
}

export default ProductCart;