import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const UserForm = () => {
    const navigate = useNavigate();
    let { id } = useParams(); // takes the user ID from the url /users/:id
    const _userId = id ? id : null; // this assigns the patent number from the url parameter to _userId
    const [user, setUser] = useState({
        name: "",
        email: "",
        verified: false,
        is_admin: false,
    });

    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card

    useEffect(() => {
        // this useEffect will run when the errors state is changed and make sure to reset the errors state after 3.5 seconds
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card
    const { setNotification } = useStateContext(); // this is for the notification message which will render on the bottom of the screen after a successful update

    // Sets the user data to fill the form if a user ID is present in the url
    if (_userId) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${_userId}`, user)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (_userId) {
            axiosClient
                .put(`/users/${user.id}/update`, user)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    setNotification("User was successfully created");
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleDelete = () => {
        let deleteConfirm = window.prompt(
            `Are you sure you want to delete this user? Type the user email to confirm: ${user.email}`
        );

        if (user.email && deleteConfirm === user.email) {
            axiosClient
                .delete(`/users/${user.id}`)
                .then(() => {
                    setNotification("User was successfully deleted");
                    navigate("/admin/users");
                })
                .catch(() => {
                    setErrors("Error: User was not deleted");
                });
        } else {
            setErrors(
                "Error: User was not deleted. Confirmation did not match records of existing user email in database."
            );
        }
        return;
    };

    return (
        <div className="w-[90%] max-w-[1024px] h-full">
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center flex justify-center items-center h-screen w-full">
                        <p className="bg-white py-2 px-8 rounded-md">
                            Loading...
                        </p>
                    </div>
                )}
                {errors && (
                    <div className="alert flex fixed bottom-10 right-10 rounded-md bg-red-500 text-white p-4 z-30">
                        {errors}
                    </div>
                )}
                {!loading && (
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col bg-white my-16 py-4 px-8 drop-shadow-md"
                    >
                        {!user.id ? (
                            <h1 className="text-2xl mb-4 mt-8 font-mono">
                                New User
                            </h1>
                        ) : (
                            <h2 className="text-2xl mb-4 mt-8 font-mono">
                                User Details
                            </h2>
                        )}
                        <h3 className="text-lg mt-4">User Name</h3>
                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    name: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="User Name"
                        />
                        <h3 className="text-lg mt-4">Email</h3>
                        <input
                            value={user.email}
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    email: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="User Email"
                        />
                        <h2>
                            {user.verified ? (
                                <span className="text-green-700">
                                    User is verified
                                </span>
                            ) : (
                                <span className="text-red-700">
                                    User is not verified
                                </span>
                            )}
                        </h2>

                        <div className="flex justify-between mt-4">
                            <div className="flex">
                                <button
                                    className="bg-green-700 py-1 px-2 mr-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                                    type="submit"
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-green-700 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-red-600 hover:underline"
                                    type="button"
                                    onClick={() => navigate("/admin/users")}
                                >
                                    Cancel
                                </button>
                            </div>
                            <button
                                className="bg-red-600 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-red-700 hover:underline"
                                type="button"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserForm;
