import useFetchProductsById from '../../../hooks/useFetchProductsByID';
import classes from './Cart.module.css';
import { toggle } from '../../../store/popup/popup';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Product } from '../../../types/product';
import { removeCart } from '../../../store/cart/cart';

const Cart = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const cartProducts = useAppSelector((state) => state.cart.productsArray);
    const products = useFetchProductsById(cartProducts);
    const dispatch = useAppDispatch();

    const userToken = useAppSelector((tocken) => tocken.coockies.userToken);

    const toggleCartHandler = () => {
        dispatch(toggle(null));
    };
    console.log(products);

    const removeBtnClick = async (product: Product) => {
        const response = await fetch('http://localhost:5000/cart/', {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ productID: product.product_id, userToken }),
        });
        if (response.ok && response.status === 200) {
            dispatch(removeCart(product.product_id));
        }
    };

    const btnClik = () => setShowCheckout((prev) => !prev);

    return (
        <div className={classes.cartWrapper}>
            This is carts
            <div>
                {products && products.length ? (
                    <>
                        {showCheckout ? (
                            <>
                                <form
                                    method="post"
                                    className={classes.form}
                                    action=""
                                >
                                    <div className={classes.miniProduct}>
                                        {products.map((product, index) => (
                                            <div key={index}>
                                                <h4>{product.product_title}</h4>
                                                <div>
                                                    {
                                                        product.product_description
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <label htmlFor="">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id=""
                                    />
                                    <label htmlFor="">Last Name</label>
                                    <input
                                        type="text"
                                        name="falst_name"
                                        id=""
                                    />
                                    <label htmlFor="">Phone</label>
                                    <input type="text" name="phone" id="" />
                                    <label htmlFor="">City</label>
                                    <input type="text" name="city" id="" />
                                    <label htmlFor="">Region</label>
                                    <input type="text" name="region" id="" />
                                    <button type="submit">Checkout</button>
                                </form>
                                <button onClick={btnClik}>Back</button>
                            </>
                        ) : (
                            <>
                                {products.map((product, index) => (
                                    <div className={classes.wrapperProduct}>
                                        <div
                                            key={index}
                                            className={classes.product}
                                        >
                                            <h2>{product.product_title}</h2>
                                            <div>
                                                {product.product_description}
                                            </div>
                                            {product.amount ? (
                                                <div>{product.amount}</div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeBtnClick(product)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button onClick={btnClik}>Buy</button>
                            </>
                        )}
                    </>
                ) : (
                    <h2>Cart is Empty</h2>
                )}
            </div>
            <button onClick={toggleCartHandler}>Close</button>
        </div>
    );
};

export default Cart;
