import { useDispatch } from 'react-redux';
import { toggle } from '../../../store/popup/popup';
import Cart from './Cart';

const CartBtn = () => {
    const dispatch = useDispatch();

    const toggleCartHndler = () => dispatch(toggle(<Cart />));

    return <button onClick={toggleCartHndler}>Cart</button>;
};

export default CartBtn;
