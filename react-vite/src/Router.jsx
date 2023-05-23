import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import PatentForm from "./views/PatentForm";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Settings from "./views/Settings";
import UserDashboard from "./views/UserDashboard";
import UserForm from "./views/UserForm";
import NewUserForm from "./views/NewUserForm";
import UserVerificationForm from "./views/UserVerificationForm";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/patents" />,
            },
            {
                path: "/patents",
                element: <Dashboard />,
            },
            {
                path: "/patents/new",
                element: <PatentForm key="patentCreate" />,
            },
            {
                path: "/patents/:patent_number",
                element: <PatentForm key="patentUpdate" />,
            },
            {
                path: "/admin/users",
                element: <UserDashboard />,
            },
            {
                path: "/admin/users/new",
                element: <NewUserForm />,
            },
            {
                path: "/admin/users/:id",
                element: <UserForm />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/settings/verify_account",
                element: <UserVerificationForm />,
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <div>404 soon come</div>,
    },
]);

export default Router;
