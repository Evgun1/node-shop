import { useEffect, useState } from 'react';
import classes from './ShopProduct.module.css';
import ProductCard from './ProductCard/ProductCard';
import { Spinner } from 'react-bootstrap';

const ShopProduct = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/products/')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <>
            {products && products.length ? (
                <div className={classes.wrapper}>
                    {products.map((value, index) => (
                        <ProductCard
                            key={index}
                            id={value.product_id}
                            text={value.product_description}
                            title={value.product_title}
                        />
                    ))}
                </div>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </>
    );
};

export default ShopProduct;
