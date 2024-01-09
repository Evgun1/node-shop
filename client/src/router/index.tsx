import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Pages/Home/Home';
import Shop from '../components/Pages/Products/Shop';
import Product from '../components/Pages/Products/Product/Product';
import ProductUpdate from '../components/Pages/Products/Product/ProudctUpdate';
import ShopCreate from '../components/Pages/Products/ShopCreate';
import Categories from '../components/Pages/Categories/Categories';
import Category from '../components/Pages/Categories/Category/Category';
import CategoryUpdate from '../components/Pages/Categories/Category/CategoryUpdate';
import CategoriesCreate from '../components/Pages/Categories/CaregoriesCreate';
import Suppliers from '../components/Pages/Suppliers/Suppliers';
import Supplier from '../components/Pages/Suppliers/Supplier/Supplier';
import SupplierUpdate from '../components/Pages/Suppliers/Supplier/SupplierUpdate';
import SuppliersCreate from '../components/Pages/Suppliers/SupplierCreate';
import NotFound from '../components/Pages/NotFound/NotFound';
import productLoader from './productLoader';

const roterConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'products',
                children: [
                    {
                        index: true,
                        element: <Shop />,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <Product />,
                                loader: productLoader,
                            },
                            {
                                path: 'update',
                                element: <ProductUpdate />,
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: <ShopCreate />,
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        element: <Categories />,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <Category />,
                            },
                            {
                                path: 'update',
                                element: <CategoryUpdate />,
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: <CategoriesCreate />,
                    },
                ],
            },
            {
                path: 'suppliers',
                children: [
                    {
                        index: true,
                        element: <Suppliers />,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <Supplier />,
                            },
                            {
                                path: 'update',
                                element: <SupplierUpdate />,
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: <SuppliersCreate />,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(roterConfig);
export default router;
