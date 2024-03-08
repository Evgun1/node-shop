'use client';

import { FC, ReactNode, useEffect } from 'react';
import classes from './Popup.module.css';
import { toggle } from '@/lib/store/popup/popup';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { createPortal } from 'react-dom';


const Popup: FC =  () => {
  const popupContent = useAppSelector((state) => state.popup.popupContent);

  useEffect(() => {
    document.body.classList.add('popup-is-open');
    return () => {
      document.body.classList.remove('popup-is-open');
    };
  }, []);

  const popupElement = document.getElementById('popup') as Element;
  const overlayElement = document.getElementById('overlay') as Element;
  return (
    <>
      {popupContent && (
        <>
          {createPortal(popupContent, popupElement)}
          {createPortal(<Overlay />, overlayElement)}
        </>
      )}
    </>
  );
};

const Overlay: FC = () => {
  const dispatch = useAppDispatch();
  const togglePopupHandler = () => {
    dispatch(toggle(null));
  };

  return <div className={classes.overlay} onClick={togglePopupHandler}></div>;
};

export default Popup;
