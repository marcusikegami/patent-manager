import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider"

export default function GuestLayout() {
    // the useStateContext function is triggered at the beginning of the render process and will quickly redirect an authenticated user to the Dashboard
    const { token, user } = useStateContext();
    if(token) {
        return <Navigate to="/" />
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Users</Link>
                <Link to ="/dashboard">Dashboard</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                    </div>
                </header>
                <main>
                    <Outlet /> {/* Outlet Components render the child components */}
                </main>
            </div>
        </div>
    )
};