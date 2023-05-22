import axiosClient from "../axios-client";

const Notifications = () => {

    const sendEmail = () => {
        axiosClient.post('/welcome');
    };
    
    return (
        <div>
        <h1>Notifications</h1>
        <button onClick={sendEmail}>Send Email</button>
        </div>
    );
}

export default Notifications;