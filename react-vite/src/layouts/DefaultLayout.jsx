import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout = ({ children }) => {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    } else if (user && user.verified === false)
        return <Navigate to="/settings/verify_account" />;

    const logout = (event) => {
        event.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };
    // upon initial login, user details are displayed correctly on the header, however, after reload, the user details are not displayed
    // the useEffect function is triggered after each render process is finished. This will make certain the user information is displayed on the header
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="default-layout" className="flex w-full min-h-screen">
            <aside className="flex flex-col px-8 py-16 bg-green-700">
                <Link
                    className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                    to="/patents"
                >
                    Patents
                </Link>
                {user.is_admin === true && (
                    <Link
                        className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                        to="/admin/users"
                    >
                        Users
                    </Link>
                )}
                <Link
                    className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                    to="/settings"
                >
                    Settings
                </Link>
            </aside>
            <div id="content" className="w-full">
                <header className="flex items-center justify-between w-full p-8">
                    <div>
                        <h1 className="text-lg font-mono drop-shadow-md">
                            Titanium 6 Laravel/React Patent Tracking System
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <p className="text-black pr-4">{user.name}</p>
                        <a
                            href="#"
                            className="bg-green-700 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                            onClick={logout}
                        >
                            Logout
                        </a>
                    </div>
                </header>
                <div className="drop-shadow-lg w-full border border-gray-200" />
                <main className="w-full flex justify-center items-center bg-gray-100">
                    <Outlet />{" "}
                    {/* Outlet Components render the children components listed under <DefaultLayout>'s in the Router */}
                </main>
                {notification && (
                    <div className="notification fixed bottom-10 right-10 rounded-md bg-green-500 text-white p-4">
                        {notification}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DefaultLayout;
