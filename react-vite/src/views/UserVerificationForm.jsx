import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const UserVerificationForm = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card
    const { user, setUser, setNotification } = useStateContext(); // this is for the notification message which will render on the bottom of the screen after a successful update

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    const [_user, _setUser] = useState({
        name: "",
        password: "",
        verified: false,
    });

    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card
    useEffect(() => {
        // this useEffect will run when the errors state is changed and make sure to reset the errors state after 3.5 seconds
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);

        if (
            _user.password !==
            document.getElementById("password_confirmation").value
        ) {
            setErrors("Passwords do not match");
            setLoading(false);
            return;
        }

        if (_user.name === "") {
            setErrors("Username cannot be empty");
            setLoading(false);
            return;
        }

        const updatedUser = {
            ...user,
            name: _user.name,
            password: _user.password,
            verified: true,
        };
        try {
            axiosClient
                .put(`/user/verify`, updatedUser)
                .then(() => {
                    setNotification("User was successfully verified!");
                    navigate("/");
                })
                .catch((err) => {
                    const response = err.response;
                    console.log(err);
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } catch {
            setErrors("Something went wrong");
        }
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
                        <div>
                            <h1 className="text-2xl mb-2 mt-8 font-mono">
                                New User Verification
                            </h1>
                            <span className="mb-4">
                                You need to update your username and password
                                before continuing to use the application.
                            </span>
                        </div>
                        <h3 className="text-lg mt-4">Username</h3>
                        <input
                            onChange={(ev) =>
                                _setUser({
                                    ..._user,
                                    name: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder={user.name ? user.name : "Username"}
                        />
                        <h3 className="text-lg mt-4">Password</h3>
                        <input
                            type="password"
                            onChange={(ev) =>
                                _setUser({
                                    ..._user,
                                    password: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder={"Password"}
                        />
                        <h3 className="text-lg mt-4">Re-enter Password</h3>
                        <input
                            id="password_confirmation"
                            type="password"
                            onChange={(ev) => {
                                if (ev.target.value !== _user.password) {
                                    setErrors("Passwords do not match");
                                }
                                if (ev.target.value === _user.password) {
                                    setErrors(null);
                                    setNotification("Passwords match");
                                }
                            }}
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="Re-enter Password"
                        />
                        <h2>
                            <span className="text-red-700">
                                Your account is not verified
                            </span>
                        </h2>

                        <div className="flex justify-between mt-4">
                            <div className="flex">
                                <button
                                    className="bg-green-700 py-1 px-2 mr-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserVerificationForm;
