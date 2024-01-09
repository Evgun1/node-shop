import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Elements/Header/Header';
import Popup from './components/Layouts/Popup/Popup';
import { FC, useEffect } from 'react';
import { readUserCoockie } from './store/coockies/actions';
import { initCart } from './store/cart/actions';
import { useAppDispatch, useAppSelector } from './hooks/redux';

const App: FC = () => {
    const dispatch = useAppDispatch();

    const popupContent = useAppSelector((state) => state.popup.popupContent);
    const coockiesToken = useAppSelector((state) => state.coockies.userToken);

    useEffect(() => {
        dispatch(readUserCoockie());
    }, []);

    useEffect(() => {
        if (coockiesToken) dispatch(initCart(coockiesToken));
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
};

export default App;
