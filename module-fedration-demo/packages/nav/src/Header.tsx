import React, {useEffect, useState} from 'react';
import './nav.css';

const Header = () => {
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

  return (
    <div className='nav-header'>
      Number of items in cart: {products.length === 0 ? '0' : products.length}
    </div>
  );
}

export default Header;