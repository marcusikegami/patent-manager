import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const PatentForm = () => {
    const navigate = useNavigate();
    // takes the patent_number from the url /patents/:patent_number
    let {patent_number} = useParams();
    console.log(patent_number);
    const [patent, setPatent] = useState({
      patent_number: '',
      title: '',
      abstract: '',
      inventor: '',
      filing_date: '',
      issue_date: '',
      jurisdiction: '',
      status: '',
      expiration_date: '',
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
  
    // on component mount set the Patent data if an patent_number is present
    if (patent_number) {
      useEffect(() => {
        setLoading(true)
        axiosClient.get(`/patents/${patent_number}`)
          .then(({data}) => {
            setLoading(false)
            setPatent(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
    }

    const onSubmit = ev => {
      ev.preventDefault()
      if (patent.patent_number) {
        axiosClient.put(`/patents/${patent.patent_number}`, patent)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/patents')
            setTimeout(() => {document.getElementById('patent_status').value = patent.status}, 3000)
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      } else {
        axiosClient.post('/users', user)
          .then(() => {
            setNotification('User was successfully created')
            navigate('/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    }
    return (
    <div className="w-[90%] h-full">
      {patent.patent_number && <h1>Update patent: {patent.name}</h1>}
      {!patent.patent_number && <h1>New patent</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit} className="flex flex-col bg-white m-4 p-8 drop-shadow-md">
            <h2 className="text-2xl mb-4 font-mono">Patent Details</h2>
            <h3 className="text-xl mt-4">Patent Number</h3>
            <input value={patent.patent_number} onChange={ev => setPatent({...patent, patent_number: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Patent Number"/>
            <h3 className="text-xl mt-4">Title</h3>
            <input value={patent.title} onChange={ev => setPatent({...patent, title: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Title"/>
            <h3 className="text-xl mt-4">Abstract</h3>
            <textarea value={patent.abstract} onChange={ev => setPatent({...patent, abstract: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2 min-h-[20rem]" placeholder="Abstract"/>
            <h3 className="text-xl mt-4">Inventor</h3>
            <input value={patent.inventor} onChange={ev => setPatent({...patent, inventor: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Inventor"/>
            <h3 className="text-xl mt-4">Jurisdiction</h3>
            <input value={patent.jurisdiction} onChange={ev => setPatent({...patent, jurisdiction: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Jurisdiction"/>
            <h3 className="text-xl mt-4">Filing Date</h3>
            <input value={patent.filing_date} onChange={ev => setPatent({...patent, filing_date: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Filing Date"/>
            <h3 className="text-xl mt-4">Issue Date</h3>
            <input value={patent.issue_date} onChange={ev => setPatent({...patent, issue_date: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Issue Date"/>
            <h3 className="text-xl mt-4">Expiration Date</h3>
            <input value={patent.expiration_date} onChange={ev => setPatent({...patent, expiration_date: ev.target.value})} className="border-2 border-gray-200 w-full my-2 p-2" placeholder="Expiration Date"/>
            <h3 className="text-xl mt-4">Status</h3>
            <select id="patent_status" name="patent_status" onChange={ev => setPatent({...patent, status: ev.target.value})} className="border-2 border-gray-200 w-fit my-2 p-2">
              <option value={patent.status}>{patent.status}</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
            </select>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
    )

};

export default PatentForm;