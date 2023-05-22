import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const NewUserForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
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

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.email) {
            user.name = user.email.split("@")[0];
            setLoading(true);
            axiosClient
                .post(`/users/create`, user)
                .then(() => {
                    setNotification("User was successfully created");
                    navigate("/admin/users");
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            setErrors("Error: User was not created, User email is required.");
        }
    };

    return (
        <div className="w-[90%] max-w-[1024px] h-screen">
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
                        <h1 className="text-2xl mb-4 mt-8 font-mono">
                            New User
                        </h1>
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
                        <span className="text-gray-500">
                            By pressing save you will create a user using this
                            email and send the new User's login info to their
                            email address
                        </span>

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
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NewUserForm;
