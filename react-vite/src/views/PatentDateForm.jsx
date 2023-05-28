import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const PatentDateForm = ({ onDateChange, patent }) => {
    const {error, setError} = useStateContext() // this is for the error messages which will render on the card
    const {issue_date, filing_date, expiration_date} = patent;
    const [patentDates, setPatentDates] = useState({
        issue_date_Day: '',
        issue_date_Month: '',
        issue_date_Year: '',
        filing_date_Day: '',
        filing_date_Month: '',
        filing_date_Year: '',
        expiration_date_Day: '',
        expiration_date_Month: '',
        expiration_date_Year: ''
      }) // this is for the patent dates which will render on the card 

      useEffect(() => {
        setPatentDates({
            issue_date_Day: issue_date ? issue_date.split('-')[2] : '',
            issue_date_Month: issue_date ? issue_date.split('-')[1] : '',
            issue_date_Year: issue_date ? issue_date.split('-')[0] : '',
            filing_date_Day: filing_date ? filing_date.split('-')[2] : '',
            filing_date_Month: filing_date ? filing_date.split('-')[1] : '',
            filing_date_Year: filing_date ? filing_date.split('-')[0] : '',
            expiration_date_Day: expiration_date ? expiration_date.split('-')[2] : '',
            expiration_date_Month: expiration_date ? expiration_date.split('-')[1] : '',
            expiration_date_Year: expiration_date ? expiration_date.split('-')[0] : '',
        })
      }, [])

    //   This useEffect detects changes in the patentDates state and calls the onDateChange function which is passed 
    // in as a prop from the PatentForm component to update the state of the patent object in the PatentForm component
      useEffect(() => {
        onDateChange({
            issue_date: `${patentDates.issue_date_Year}-${patentDates.issue_date_Month}-${patentDates.issue_date_Day}`,
            filing_date: `${patentDates.filing_date_Year}-${patentDates.filing_date_Month}-${patentDates.filing_date_Day}`,
            expiration_date: `${patentDates.expiration_date_Year}-${patentDates.expiration_date_Month}-${patentDates.expiration_date_Day}`,
        });
      }, [patentDates]);

      const days = Array.from({ length: 31 }, (_, i) => i + 1);
      const months = Array.from({ length: 12 }, (_, i) => i + 1);

      const handleChange = (ev) => {
        const { name, value } = ev.target;
        setPatentDates({
            ...patentDates,
             [name]: value,
            });
      };

    return (
        <div className='mt-4'>
            <span className='text-lg text-gray-500 font-bold'>*Date Format: DD-MM-YYYY</span>
            {/* Filing Date */}
            <h3 className="text-lg">Filing Date</h3>
            <select id="filing_date_Day" name="filing_date_Day" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
                { filing_date ? <option value={filing_date.split('-')[2]}>{filing_date.split('-')[2]}</option> : <option value="">Day</option> }
                {days.map(day => {
                    if (day <= 9) day = day.toString().padStart(2, '0');
                    return (<option key={day} value={day}>{day}</option>)
                })}
            </select>
            <select id="filing_date_Month" name="filing_date_Month" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
            { filing_date ? <option value={filing_date.split('-')[1]}>{filing_date.split('-')[1]}</option> : <option value="">Month</option> }
                {months.map(month => {
                    if (month <= 9) month = month.toString().padStart(2, '0');
                    return (
                        <option key={month} value={month}>{month}</option>
                    )
        })}
            </select>
            { filing_date &&  <input type="text" id="filing_date_Year" name="filing_date_Year" placeholder='Year' onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2" defaultValue={patentDates.filing_date_Year} />}
            {/* Issue Date */}
            <h3 className="text-lg mt-4">Issue Date</h3>
            <select id="issue_date_Day" name="issue_date_Day" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
                { issue_date ? <option value={issue_date.split('-')[2]}>{issue_date.split('-')[2]}</option> : <option value="">Day</option> }
                {days.map(day => {
                    if (day <= 9) day = day.toString().padStart(2, '0');
                    return (<option key={day} value={day}>{day}</option>)
                })}
            </select>
            <select id="issue_date_Month" name="issue_date_Month" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
                { issue_date ? <option value={issue_date.split('-')[1]}>{issue_date.split('-')[1]}</option> : <option value="">Month</option> }
                {months.map(month => {
                    if (month <= 9) month = month.toString().padStart(2, '0');
                    return (
                        <option key={month} value={month}>{month}</option>
                    )
        })}
            </select>
            { issue_date &&  <input type="text" id="issue_date_Year" name="issue_date_Year" placeholder='Year' onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2" defaultValue={patentDates.issue_date_Year} />}
            {/* Expiration Date */}
            <h3 className="text-lg mt-4">Expiration Date</h3>
            <select id="expiration_date_Day" name="expiration_date_Day" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
                { expiration_date ? <option value={expiration_date.split('-')[2]}>{expiration_date.split('-')[2]}</option> : <option value="">Day</option> }
                {days.map(day => {
                    if (day <= 9) day = day.toString().padStart(2, '0');
                    return (<option key={day} value={day}>{day}</option>)
                })}
            </select>
            <select id="expiration_date_Month" name="expiration_date_Month" onChange={ev => handleChange(ev)} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2">
                { expiration_date ? <option value={expiration_date.split('-')[1]}>{expiration_date.split('-')[1]}</option> : <option value="">Month</option> }
                {months.map(month => {
                    if (month <= 9) month = month.toString().padStart(2, '0');
                    return (
                        <option key={month} value={month}>{month}</option>
                    )
        })}
            </select>
            { expiration_date && <input type="text" id="expiration_date_Year" name="expiration_date_Year" placeholder='Year' onChange={handleChange} className="border-2 border-gray-200 w-fit mt-1 mb-2 p-2" defaultValue={patentDates.expiration_date_Year} />}
        </div>
    )
}

export default PatentDateForm;