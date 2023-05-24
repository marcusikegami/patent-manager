import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const Settings = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card
    const { user, setNotification } = useStateContext(); // this is for the notification message which will render on the bottom of the screen after a successful update

    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card
    useEffect(() => {
        // this useEffect will run when the errors state is changed and make sure to reset the errors state after 3.5 seconds
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    const [_user, _setUser] = useState({
        notifications: {
            day: false,
            week: false,
            month: false,
            sixmonth: false,
            year: false,
            expired: false,
        },
    });

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/user")
            .then(({ data }) => {
                _setUser(data);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        debugger;
        setLoading(true);
        axiosClient
            .put(`/users/${user.id}/update`, _user)
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
        <div className="w-[90%] max-w-[1024px] max-[600px]:h-screen h-full">
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
                        <h2 className="text-xl mb-4 mt-8 font-mono">
                            Notification Settings
                        </h2>
                        <span>
                            Checked boxes determine the time intervals by which
                            email notifications will be sent to your email:
                            <p className="text-green-600">{user.email}</p>
                        </span>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">
                                Post Expiration
                            </h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.expired}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            expired: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">Day Before</h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.day}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            day: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">One Week</h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.week}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            week: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">One Month</h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.month}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            month: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">Six Months</h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.sixmonth}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            sixmonth: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
                        <div className="flex items-center mt-2 py-1 px-2 border-b">
                            <h3 className="text-md w-[125px]">One Year</h3>
                            <input
                                type="checkbox"
                                checked={_user.notifications.year}
                                onChange={(ev) =>
                                    _setUser({
                                        ..._user,
                                        notifications: {
                                            ..._user.notifications,
                                            year: ev.target.checked,
                                        },
                                    })
                                }
                                className="border-2 border-gray-200 w-min ml-4"
                            />
                        </div>
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

export default Settings;
