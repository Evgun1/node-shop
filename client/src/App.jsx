import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Elements/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './components/Layouts/Popup/Popup';
import { useEffect } from 'react';
import { readUserCoockie } from './store/Coockies/actions';
import { initCart } from './store/Cart/cart.actions';

function App() {
    const dispatch = useDispatch();

    const popupContent = useSelector((state) => state.popup.popupContent);
    const coockiesToken = useSelector((state) => state.coockies.userToken);

    useEffect(() => {
        dispatch(readUserCoockie());
    }, []);

    useEffect(() =>{ 
        dispatch(initCart(coockiesToken))
    }, [coockiesToken]);
    return (
        <>
            <Header />
            <main>
                {popupContent && <Popup>{popupContent}</Popup>}
                <Outlet />
            </main>
        </>
    );
}

export default App;
