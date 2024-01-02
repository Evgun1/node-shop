import { useDispatch, useSelector } from 'react-redux';
import useFetchProductsById from '../../../hooks/useFetchProductsByID';
import classes from './Cart.module.css';
import { toggle } from '../../../store/popup/popup';
import { useState } from 'react';
import { cartSlice } from '../../../store/Cart/cart';

const Cart = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const cartProducts = useSelector((state) => state.cart.productsArray);
    const products = useFetchProductsById(cartProducts);
    const dispatch = useDispatch();

    const toggleCartHandler = () => {
        dispatch(toggle(null));
    };
    console.log(products);

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
                                    <div
                                        key={index}
                                        className={classes.product}
                                    >
                                        <h2>{product.product_title}</h2>
                                        <div>{product.product_description}</div>
                                        <div>{product.amount}</div>
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
