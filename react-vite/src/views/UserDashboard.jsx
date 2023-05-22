import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate } from "react-router-dom";

const UserDashboard = () => {
    const { user, notification, setNotification } = useStateContext(); // contains current user data and allows setting of notification message which will render on the bottom of the screen after a successful update
    const [users, setUsers] = useState(null);
    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card

    useEffect(() => {
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card

    if (!user.is_admin) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setNotification("Error retrieving users: No users found.");
            });
    }, []);

    const handleAdminChange = (user) => {
        console.log(user);
        setLoading(true);
        axiosClient
            .put(`/users/${user.id}/update/admin`, {
                ...user,
                is_admin: !user.is_admin,
            })
            .then(({ data }) => {
                const updatedUser = data;
                setNotification("User updated successfully.");
                setLoading(false);
                setUsers((prevUsers) => {
                    const index = prevUsers.findIndex(
                        (user) => user.id === updatedUser.id
                    );
                    const newUsers = [...prevUsers];
                    newUsers[index] = updatedUser;
                    return newUsers;
                });
            })
            .catch((error) => {
                console.log(error);
                setNotification("Error updating user: Please try again later.");
                setLoading(false);
            });
    };

    return (
        <div id="dashboard" className="py-16 min-h-screen">
            {loading && (
                <div className="text-center flex justify-center items-center h-screen w-full">
                    <p className="bg-white py-2 px-8 rounded-md">Loading...</p>
                </div>
            )}
            {errors && (
                <div className="alert flex fixed bottom-10 right-10 rounded-md bg-red-500 text-white p-4 z-30">
                    {errors}
                </div>
            )}
            {!loading && (
                <>
                    <div
                        id="table-name"
                        className="flex justify-between items-center pb-4"
                    >
                        <h1 className="text-2xl font-bold font-mono">Users</h1>
                        <Link
                            className="bg-green-700 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                            to="/admin/users/new"
                        >
                            Add New User
                        </Link>
                    </div>
                    <div
                        id="table"
                        className="flex column bg-white mx-4 drop-shadow"
                    >
                        <table>
                            <thead className="bg-green-700 text-white w-full rounded-t-md">
                                <tr className="">
                                    <th className="py-1 px-4">Name</th>
                                    <th className="py-1 px-4">Email</th>
                                    <th className="py-1 px-4">Verified</th>
                                    <th className="py-1 px-4">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    Array.isArray(users) &&
                                    users.map((user) => {
                                        return (
                                            <tr
                                                key={user.name}
                                                className="hover:bg-green-100 transition-all duration-300 cursor-pointer"
                                            >
                                                <td className="p-2 border-b border-gray-300">
                                                    {user.name}
                                                </td>
                                                <td className="p-2 border-b border-gray-300 hover:underline">
                                                    <Link
                                                        to={`/admin/users/${user.id}`}
                                                    >
                                                        {user.email}
                                                    </Link>
                                                </td>
                                                <td className="p-2 border-b text-center border-gray-300">
                                                    {user.verified
                                                        ? "Yes"
                                                        : "No"}
                                                </td>
                                                <td className="p-2 border-b text-center border-gray-300">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.is_admin}
                                                        onChange={(e) =>
                                                            handleAdminChange(
                                                                user
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;
