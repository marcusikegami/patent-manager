import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import PatentForm from './views/PatentForm';
import DefaultLayout from './layouts/DefaultLayout';
import Notifications from './views/Notifications';

const Router = createBrowserRouter([
    {
        path: '*',
        element: <div>404 soon come</div>
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/patents' />
            },
            {
                path: '/patents',
                element: <Dashboard />
            },
            {
                path: '/patents/new',
                element: <PatentForm key='patentCreate'/>
            },
            {
                path: '/patents/:patent_number',
                element: <PatentForm key='patentUpdate' />
            },
            {
                path: '/settings/notifications',
                element: <Notifications />
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path: '/login',
        element: <Login />
    }
]);

export default Router;