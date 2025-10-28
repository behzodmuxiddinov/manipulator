import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, RouteLayout } from '@/layouts';
import { ROUTES } from '@/constants';

const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Home = lazy(() => import('../pages/home/home'));

const { LOGIN, REGISTER, HOME } = ROUTES;

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {
                path: LOGIN,
                element: <Login/>
            },
            {
                path: REGISTER,
                element: <Register/>
            }
        ]
    },
    {
        element: <RouteLayout/>,
        children: [
            {
                path: HOME,
                element: <Home/>
            }
        ]
    }
]);