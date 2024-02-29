import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { FormEventHandler, useState } from 'react';
// import { addToCart } from '../../../../store/cart/cart';
import classes from './Product.module.css';
import { Product } from '../../../../types/product';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { updateCart } from '../../../../store/cart/actions';

const Product = () => {
  const data = useLoaderData() as { product: Product };
  const product = data.product;
  const cart = useAppSelector((state) => state.cart);
  const userToken = useAppSelector((state) => state.coockies.userToken);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(1);

  const productID = product.product_id;

  const btnPlus = () => {
    setAmount(amount + 1);
  };
  const btnMinus = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userToken) {
      dispatch(
        updateCart({
          cart: cart.productsArray,
          curentProduct: { productID: product.product_id, amount },
          userToken: userToken,
        })
      );
    }
  };

  return (
    <Container>
      <form onSubmit={formSubmit} className={classes.form}>
        <input type="hidden" defaultValue={productID} name="productID" />
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
