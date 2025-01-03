import { useState } from 'react';
import useFetch from "./useFetch";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const CreateReservation = () => {
    const token = localStorage.getItem("authToken");
    let userId = "";

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.sub;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const { error, isPending, data: fetchedProducts } = useFetch("http://localhost:5274/Menu");
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
    const [service_id, SetService_id] = useState(null);
    const [product, setProduct] = useState(0);
    useEffect(() => {
        // Get the user's role from localStorage
        const businessId = localStorage.getItem("businessId");
        SetBusiness_id(businessId);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending2(true);

        const reservation = {client_name, client_phone, appointment_time, duration, service_id: product, employee_id: userId, business_id};
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
                <label>client_name:</label>
                    <input
                        type="text"
                        value={client_name}
                        onChange={(e) => SetClient_name(e.target.value)}
                    ></input>
                <label>client_phone:</label>
                    <input
                        type="text"
                        value={client_phone}
                        onChange={(e) => SetClient_phone(e.target.value)}
                    ></input>
                <label>appointment_time:</label>
                    <input
                        type="datetime-local"
                        value={appointment_time}
                        onChange={(e) => SetAppointment_time(e.target.value)}
                    ></input>
                <label>duration:</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => SetDuration(e.target.value)}
                    ></input>
                    {fetchedProducts && <select value={product} onChange={e => setProduct(e.target.value)}>
                        <option value="0">-</option>
                        {fetchedProducts.map(product => (
                            <option key={product.id} value={product.id}>{product.productName}</option>
                        ))}
                </select>}
                
                {!isPending2 && <button className='createReservationButton'>Add Reservation</button>}
                {isPending2 && <button disabled> Adding...</button>}
            </form>
        </div>
    )
}

export default CreateReservation;