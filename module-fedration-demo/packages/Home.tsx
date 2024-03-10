
import React, { Suspense } from 'react';
const Header = React.lazy(() => import('nav/Header'));
const Footer = React.lazy(() => import('nav/Footer'));
const ProductCatelog = React.lazy(() => import('product_catelog/ProductCatelog'));
const ProductCart = React.lazy(() => import('product_cart/ProductCart'));
import './home.css';

const Home = () => {
    return (
        <div>
            <h1>Dummy e-Commerce</h1>
            <Suspense fallback={'Loading....'}>
                <Header />
                <div className='body-container'>
                <ProductCatelog />
                <ProductCart />
                </div>
                <Footer />
            </Suspense>
        </div>
    )
}

export default Home;