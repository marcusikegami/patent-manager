import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function () {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken, token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors({});
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            }) // There is no need to redirect the user to a specific page because the useStateContext function will redirect the user to the dashboard page
            .catch((error) => {
                console.error;
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
            <div className="form">
                <form onSubmit={onSubmit} className="flex flex-col ">
                    <h1 className="bg-green-700 text-white py-4 px-10">
                        Login into your account
                    </h1>

                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input
                        className="px-4 py-2 border-gray border"
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        className="px-4 py-2 border-gray border"
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="bg-white py-2 border border-t-0 text-green-700 hover:underline hover:animate-pulse">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
