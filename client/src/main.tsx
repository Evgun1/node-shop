import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router/index.jsx';
import store from './store/index.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLHtmlElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
