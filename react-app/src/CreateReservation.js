import { useState } from 'react';
import useFetch from "./useFetch";
import "./App.css";

const CreateReservation = () => {

    const [isPending2, setIsPending2] = useState(false);
    const [id, SetId] = useState('');
    const [business_id, SetBusiness_id] = useState('');
    const [employee_id, SetEmployee_id] = useState('');
    const [client_name, SetClient_name] = useState('');
    const [client_phone, SetClient_phone] = useState('');
    const [created_at, SetCreated_at] = useState('');
    const [last_modified, SetLast_modified] = useState('');
    const [appointment_time, SetAppointment_time] = useState('');
    const [duration, SetDuration] = useState('');
    const [reservationStatus, SetReservationStatus] = useState('');
    const [service_id, SetService_id] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending2(true);

        const reservation = {id, business_id, employee_id, client_name, client_phone, created_at, last_modified, appointment_time, duration, reservationStatus, service_id};
        fetch('http://localhost:5274/Reservation', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reservation)
        }).then(() =>{
            console.log("New reservation added");
            setIsPending2(false);
        }).catch(err => {
            console.log("error creating reservation: " + err.name);
            setIsPending2(false);
        })
    }

    
    return(
        <div className="CreateReservation">
        <h2>Create Reservation: </h2>
            <form onSubmit={handleSubmit}>
                <label>id:</label>
                    <input
                        type="text"
                        required
                        value={id}
                        onChange={(e) => SetId(e.target.value)}
                    ></input>
                <label>business_id:</label>
                    <input
                        type="text"
                        required
                        value={business_id}
                        onChange={(e) => SetBusiness_id(e.target.value)}
                    ></input>
                <label>employee_id:</label>
                    <input
                        type="text"
                        required
                        value={employee_id}
                        onChange={(e) => SetEmployee_id(e.target.value)}
                    ></input>
                <label>client_name:</label>
                    <input
                        type="text"
                        required
                        value={client_name}
                        onChange={(e) => SetClient_name(e.target.value)}
                    ></input>
                <label>client_phone:</label>
                    <input
                        type="text"
                        required
                        value={client_phone}
                        onChange={(e) => SetClient_phone(e.target.value)}
                    ></input>
                <label>created_at:</label>
                    <input
                        type="text"
                        required
                        value={created_at}
                        onChange={(e) => SetCreated_at(e.target.value)}
                    ></input>
                <label>last_modified:</label>
                    <input
                        type="text"
                        required
                        value={last_modified}
                        onChange={(e) => SetLast_modified(e.target.value)}
                    ></input>
                <label>appointment_time:</label>
                    <input
                        type="text"
                        required
                        value={appointment_time}
                        onChange={(e) => SetAppointment_time(e.target.value)}
                    ></input>
                <label>duration:</label>
                    <input
                        type="text"
                        required
                        value={duration}
                        onChange={(e) => SetDuration(e.target.value)}
                    ></input>
                <label>ReservationStatus:</label>
                    <input
                        type="text"
                        required
                        value={reservationStatus}
                        onChange={(e) => SetReservationStatus(e.target.value)}
                    ></input>
                <label>service_id:</label>
                    <input
                        type="text"
                        required
                        value={service_id}
                        onChange={(e) => SetService_id(e.target.value)}
                    ></input>
                {!isPending2 && <button className='createReservationButton'>Add Reservation</button>}
                {isPending2 && <button disabled> Adding...</button>}
            </form>
        </div>
    )
}

export default CreateReservation;