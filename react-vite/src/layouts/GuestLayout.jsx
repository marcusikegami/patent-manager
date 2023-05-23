import { Outlet, Navigate, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    // the useStateContext function is triggered at the beginning of the render process and will quickly redirect an authenticated user to the Dashboard
    const { token, user, notification } = useStateContext();
    if (token && user.verified === true) {
        return <Navigate to="/" />;
    }

    const logout = (event) => {
        event.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div
            id="default-layout"
            className="flex flex-col min-[600px]:flex-row w-full min-h-screen "
        >
            <aside className="flex flex-col px-8 py-4 min-[600px]:py-16 bg-green-700">
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
                        <h1 className="text-md min-[600px]:text-lg font-mono drop-shadow-md">
                            Titanium 6 Laravel/React Patent Tracking System
                        </h1>
                    </div>
                    <div className="flex items-center">
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
}
