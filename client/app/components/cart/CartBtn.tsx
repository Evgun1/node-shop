'use client';

import { useAppDispatch } from '@/lib/redux';
import Cart from './Cart';
import { toggle } from '@/lib/store/popup/popup';

const CartBtn = () => {
  const dispatch = useAppDispatch();

  const toggleCartHndler = () => dispatch(toggle(<Cart />));

  return (
    <button className={'nav-link'} onClick={toggleCartHndler}>
      Cart
    </button>
  );
};

export default CartBtn;
