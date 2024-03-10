
import fruits from './fruit';
import React from 'react';
import './product-catelog.css';

const ProductCatelog = () => {
    
    const addToCart = (item) => () => {
        const event = new CustomEvent('addToCart', { detail: item });
        window.dispatchEvent(event);
    }

    return (
        <div className='product-catelog-container'>
            {/* <h3>Product Catelog</h3> */}
            <div className='grid-container'>
                {
                    fruits.map((fruit, index) => (
                    <div className='grid-item' key={index}>
                        <span className='grid-item-name'>{fruit.name}</span>
                        <span className='grid-item-price'>&#x20b9;{fruit.price}</span>
                        <img src={fruit.image} alt={fruit.name} />
                        <button className='add-to-cart' onClick={addToCart(fruit)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCatelog;