import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// The Dashboard component is the main view of the application. It will be the first thing the user sees when they log in.
// It will display a list of all the registered patents and allow the user to create new patents. It will also allow the user to edit and delete patents.
const Dashboard = () => {
    const [patents, setPatents] = useState(null);

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card
    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card

    useEffect(() => {
        // this useEffect will run when the errors state is changed and make sure to reset the errors state after 3.5 seconds
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/patents")
            .then(({ data }) => {
                setPatents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setNotification("Error retrieving Patents: No Patents found.");
            });
    }, []);

    const detectExpiration = (date) => {
        const today = new Date();
        const expirationDate = new Date(date);
        const daysLeft = Math.floor(
            (expirationDate - today) / (1000 * 60 * 60 * 24)
        );
        if (daysLeft <= 0) {
            return "Expired bg-red-600 text-white hover:text-black";
        } else if (daysLeft <= 30) {
            return "Expiring Soon bg-yellow-200";
        } else {
            return "Active bg-green-400 text-white";
        }
    };

    const detectStatus = (date) => {
        const today = new Date();
        const expirationDate = new Date(date);
        const daysLeft = Math.floor(
            (expirationDate - today) / (1000 * 60 * 60 * 24)
        );
        if (daysLeft <= 0) {
            return "Expired";
        } else if (daysLeft <= 30) {
            return "Expiring Soon";
        } else {
            return "Active";
        }
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
                        <h1 className="text-2xl font-bold font-mono">
                            Patents
                        </h1>
                        <Link
                            className="bg-green-700 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                            to="/patents/new"
                        >
                            Add New Patent
                        </Link>
                    </div>
                    <div
                        id="table"
                        className="flex column bg-white mx-4 drop-shadow"
                    >
                        <table>
                            <thead className="bg-green-700 text-white w-full rounded-t-md">
                                <tr className="">
                                    <th className="py-1 px-4">#</th>
                                    <th className="py-1 px-4">Title</th>
                                    <th className="py-1 px-4">Exp. Date</th>
                                    <th className="py-1 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patents &&
                                    patents.map((patent, index) => {
                                        const expiration = new Date(
                                            patent.expiration_date
                                        );
                                        return (
                                            <tr
                                                key={patent.title}
                                                className="hover:bg-green-100 transition-all duration-300 cursor-pointer"
                                            >
                                                <td className="p-2 border-b border-gray-300">
                                                    {patent.patent_number}
                                                </td>
                                                <td className="p-2 border-b border-gray-300 hover:underline">
                                                    <Link
                                                        to={`/patents/${patent.patent_number}`}
                                                    >
                                                        {patent.title}
                                                    </Link>
                                                </td>
                                                <td className="p-2 border-b border-gray-300">
                                                    {patent.expiration_date}
                                                </td>
                                                <td
                                                    className={`p-2 border-b border-gray-300 text-center ${detectExpiration(
                                                        expiration
                                                    )}`}
                                                >
                                                    {detectStatus(expiration)}
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

export default Dashboard;
