import { useEffect, useState } from 'react';
import classes from './ShopProduct.module.css';
import ProductCart from './ProductCart/ProductCart';
import { Spinner } from 'react-bootstrap';
import { Product } from '../../../types/product';

const ShopProduct = () => {
    const [products, setProducts] = useState<Product[]>();

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
                        <ProductCart
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
