import { useState } from 'react';
import classes from './ShopProduct.module.css';
import ProductCart from './ProductCart/ProductCart';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../Pagination/Pagination';
import PaginationLimit from '../Pagination/PaginationLimit';
import usePaginationFetch from '../../../hooks/usePaginationFetch';

const LIMIT_ARRAY: number[] = [10, 30, 50];

const ShopProduct = () => {
    const [limit, setLimit] = useState<number>(10);

    const { products, productsCount } = usePaginationFetch(
        'http://localhost:5000/products'
    );

    return (
        <>
            {products && products.length ? (
                <>
                    <div>
                        {LIMIT_ARRAY && LIMIT_ARRAY.length && (
                            <PaginationLimit
                                currentLimit={limit}
                                setNewLimit={setLimit}
                                limitsArray={LIMIT_ARRAY}
                            />
                        )}
                    </div>
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
                    <CustomPagination limit={limit} rowsCount={productsCount} />
                </>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </>
    );
};

export default ShopProduct;
