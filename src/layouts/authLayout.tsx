import App from '@/App';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <App>
            <div className="text-black dark:text-white-dark min-h-screen">{<Outlet />}</div>
        </App>
    );
};