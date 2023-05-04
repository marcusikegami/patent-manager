import axiosClient from '../axios-client';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// The Dashboard component is the main view of the application. It will be the first thing the user sees when they log in. 
// It will display a list of all the registered patents and allow the user to create new patents. It will also allow the user to edit and delete patents.
const Dashboard = () => {
    const [patents, setPatents] = useState(null);

    useEffect(() => {
        axiosClient.get('/patents')
            .then(({data}) => {
                setPatents(data);
            })
    }, []);

    return (
    <div id="dashboard" className="py-16 min-h-screen">
        <div id="table-name" className="flex justify-between items-center pb-2">
            <h1 className="text-2xl font-bold font-mono">Patents</h1>
            <Link className="bg-green-700 py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline" to="/patents/new">Add New Patent</Link>
        </div>
        <div id="table" className="flex column bg-white">
            <table>
                <thead className='bg-green-700 text-white w-full'>
                    <tr className=''>
                        <th className='py-1 px-4'>#</th>
                        <th className='py-1 px-4'>Title</th>
                        <th className='py-1 px-4'>Exp. Date</th>
                        <th className='py-1 px-4'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {patents && patents.map((patent, index) => {
                        return (
                            <tr key={patent.id} className='hover:bg-green-100 transition-all duration-300'>
                                <td className='p-2 border-b border-gray-500'>{patent.patent_number}</td>
                                <td className='p-2 border-b border-gray-500'><Link to={`/patents/${patent.patent_number}`}>{patent.title}</Link></td>
                                <td className='p-2 border-b border-gray-500'>{patent.expiration_date}</td>
                                <td className='p-2 border-b border-gray-500 text-center'>{patent.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )

};

export default Dashboard;