import  { FC, ReactNode, useEffect } from 'react';

import { createPortal } from 'react-dom';
import { toggle } from '../../../store/popup/popup';

import { useDispatch } from 'react-redux';

import classes from './Popup.module.css';


const Popup:FC<{children: ReactNode}> = (props) => {
    useEffect(() => {
        document.body.classList.add('popup-is-open');
        return () => {
            document.body.classList.remove('popup-is-open');
        };
    }, []);
    return (
        <>
            {createPortal(props.children, document.getElementById('popup') as Element)}
            {createPortal(<Overlay />, document.getElementById('overlay')  as Element)}
        </>
    );
};

const Overlay = () => {
    const dispatch = useDispatch();
    const togglePopupHandler = () => {
        dispatch(toggle(null));
    };

    return <div className={classes.overlay} onClick={togglePopupHandler}></div>;
};

export default Popup;
