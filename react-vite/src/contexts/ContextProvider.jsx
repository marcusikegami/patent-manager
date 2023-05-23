import { createContext, useContext, useEffect, useState } from "react";

// default values for the context are set as null and the functions are made empty simply to enable autocomplete in the IDE
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    notification: null,
    setNotification: () => {},
});

// This provider will be used to share the authentification state of the user across the app
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 3000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        // Any function which receives this context will have access to the 'user' and 'token' values and the functions 'setUser' and 'setToken'
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// this function will be used in the components which need to determine the authentification state of the user
// it will return the values (user, token) and the functions (setUser, setToken)

export const useStateContext = () => useContext(StateContext);
