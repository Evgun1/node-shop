import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToCart } from '../../../../store/Cart/cart';
import Cart from '../../../Elements/Cart/Cart';
import classes from './Product.module.css';
import { updateCart } from '../../../../store/Cart/cart.actions';
import useSaveDbCart from '../../../../hooks/useSaveDbCart';

const Product = () => {
    const data = useLoaderData();
    const product = data.product;
    const cart = useSelector((state) => state.cart);
    const userToken = useSelector((state) => state.coockies.userToken);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const { isSending, saveCart } = useSaveDbCart();

    const productID = product.product_id;

    const btnPlus = () => {
        setAmount(amount + 1);
    };
    const btnMinus = () => {
        if (amount > 0) {
            setAmount(amount - 1);
        }
    };

    const formSubmit = (event) => {
        event.preventDefault();
        dispatch(addToCart({ productID, amount }));
    };

    useEffect(() => {
        saveCart(cart, userToken);
    }, [cart]);

    //
    //
    //

    return (
        <Container>
            {isSending && <p>Sending cart data to DB</p>}
            <form onSubmit={formSubmit} className={classes.form}>
                <input
                    type="hidden"
                    defaultValue={productID}
                    name="productID"
                />
                <input type="hidden" name="amount" value={amount} />

                <div>
                    <img src="https://placehold.co/600x400" alt="img" />
                </div>
                <div className={classes.mainDescroption}>
                    <div className={classes.description}>
                        <h2> {product.product_title}</h2>
                        <p>{product.product_description}</p>
                        <div>{product.unit_price}$</div>
                    </div>
                    <div className={classes.nav}>
                        <div className={classes.navAmount}>
                            <button onClick={btnPlus} type="button">
                                +
                            </button>
                            <div>{amount}</div>
                            <button onClick={btnMinus} type="button">
                                -
                            </button>
                        </div>
                    </div>
                    <button
                        className={`${classes.btn} ${'btn btn-primary'}`}
                        variant="primary"
                        type="submit"
                    >
                        Buy
                    </button>
                </div>
            </form>
            {/* <Cart /> */}
        </Container>
    );
};

export default Product;
