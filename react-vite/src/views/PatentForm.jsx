import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import PatentDateForm from "./PatentDateForm.jsx";

const PatentForm = () => {
    const navigate = useNavigate();
    let { patent_number } = useParams(); // takes the patent_number from the url /patents/:patent_number
    const _patentNumber = patent_number ? patent_number : null; // this assigns the patent number from the url parameter to _patentNumber
    const [patent, setPatent] = useState({
        patent_number: "",
        title: "",
        abstract: "",
        inventor: "",
        jurisdiction: "",
        status: "",
        issue_date: "",
        filing_date: "",
        expiration_date: "",
    });

    const [errors, setErrors] = useState(null); // this is for the error messages which will render on the card

    useEffect(() => {
        setTimeout(() => {
            setErrors(null);
        }, 3500);
    }, [errors]);

    const [loading, setLoading] = useState(false); // this is for the loading message which will render on the card
    const { setNotification } = useStateContext(); // this is for the notification message which will render on the bottom of the screen after a successful update

    // Sets the Patent data to fill the form if a patent_number is present in the url
    if (_patentNumber) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/patents/${_patentNumber}`)
                .then(({ data }) => {
                    setLoading(false);
                    setPatent(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (_patentNumber) {
            axiosClient
                .put(`/patents/${patent.patent_number}`, patent)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/patents");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/patents", patent)
                .then(() => {
                    setNotification("Patent was successfully created");
                    navigate("/patents");
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
            `Are you sure you want to delete this patent? Type the patent number to confirm: ${patent.patent_number}`
        );

        if (_patentNumber && deleteConfirm === _patentNumber) {
            axiosClient
                .delete(`/patents/${patent.patent_number}`)
                .then(() => {
                    setNotification("Patent was successfully deleted");
                    navigate("/patents");
                })
                .catch(() => {
                    setErrors("Error: Patent was not deleted");
                });
        } else {
            setErrors(
                "Error: Patent was not deleted. Confirmation did not match records of existing patent number in database."
            );
        }
        return;
    };

    const handleDateChange = ({ issue_date, filing_date, expiration_date }) => {
        setPatent({
            ...patent,
            issue_date: issue_date,
            filing_date: filing_date,
            expiration_date: expiration_date,
        });
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
                        {!patent.patent_number ? (
                            <h1 className="text-2xl mb-4 mt-8 font-mono">
                                New Patent
                            </h1>
                        ) : (
                            <h2 className="text-2xl mb-4 mt-8 font-mono">
                                Patent Details
                            </h2>
                        )}
                        <h3 className="text-lg mt-4">Patent Number</h3>
                        <input
                            value={patent.patent_number}
                            onChange={(ev) =>
                                setPatent({
                                    ...patent,
                                    patent_number: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="Patent Number"
                        />
                        <h3 className="text-lg mt-4">Title</h3>
                        <input
                            value={patent.title}
                            onChange={(ev) =>
                                setPatent({ ...patent, title: ev.target.value })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="Title"
                        />
                        <h3 className="text-lg mt-4">Abstract</h3>
                        <textarea
                            value={patent.abstract}
                            onChange={(ev) =>
                                setPatent({
                                    ...patent,
                                    abstract: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2 min-h-[15rem]"
                            placeholder="Abstract"
                        />
                        <h3 className="text-lg mt-4">Inventor</h3>
                        <input
                            value={patent.inventor}
                            onChange={(ev) =>
                                setPatent({
                                    ...patent,
                                    inventor: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="Inventor"
                        />
                        <h3 className="text-lg mt-4">Jurisdiction</h3>
                        <input
                            value={patent.jurisdiction}
                            onChange={(ev) =>
                                setPatent({
                                    ...patent,
                                    jurisdiction: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-full mt-1 mb-2 p-2"
                            placeholder="Jurisdiction"
                        />

                        {/* PatendDateForm Renders the three separate date selections for Filiing, Issue, and Expiration dates */}
                        <PatentDateForm
                            onDateChange={handleDateChange}
                            patent={patent}
                        />

                        <h3 className="text-lg mt-4">Status</h3>
                        <select
                            id="patent_status"
                            name="patent_status"
                            onChange={(ev) =>
                                setPatent({
                                    ...patent,
                                    status: ev.target.value,
                                })
                            }
                            className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2"
                        >
                            <option value={patent.status}>
                                {patent.status}
                            </option>
                            <option value="pending">pending</option>
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                            <option value="approved">approved</option>
                            <option value="rejected">rejected</option>
                            <option value="abandoned">abandoned</option>
                            <option value="granted">granted</option>
                            <option value="withdrawn">withdrawn</option>
                            <option value="infringed">infringed</option>
                            <option value="litigated">litigated</option>
                            <option value="in re-examination">
                                in re-examination
                            </option>
                            <option value="revoked">revoked</option>
                            <option value="expunged">expunged</option>
                            <option value="lapsed">lapsed</option>
                            <option value="in examination">
                                in examination
                            </option>
                            <option value="expired">expired</option>
                        </select>
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
                                    onClick={() => navigate("/patents")}
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

export default PatentForm;
