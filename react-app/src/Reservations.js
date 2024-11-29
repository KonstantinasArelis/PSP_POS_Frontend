import ReservationsList from "./ReservationList";
import ReservationViewInput from "./ReservationViewInput";
import useFetch from "./useFetch";
import {Link} from "react-router-dom"
import { useState } from "react";
import './App.css';
const Reservations = () => {
    //const { error, isPending, data: reservations } = useFetch('http://localhost:5274/order?employee_id=123&min_total_amount=50&max_total_amount=1000&order_status=OPEN&page_nr=0&limit=25')
    const [url, SetUrl] = useState("http://localhost:5274/Reservation");
    //const [url, SetUrl] = useState("http://localhost:5274/Reservation/3");
    console.log("the fetched url is " + url);
    const { error, isPending, data: reservations } = useFetch(url);

    const handleUrlChange = (newUrl) => {
        SetUrl("http://localhost:5274/Reservation?" + newUrl);
    }

    return(
        <div className="reservationsTab">
            <Link to="/CreateReservation">Create Reservation:</Link>
            <h2>Reservations:</h2>
            <ReservationViewInput onChange={handleUrlChange}></ReservationViewInput>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/*reservations && */ <ReservationsList reservations={reservations}></ReservationsList>}
        </div>
    );
}

export default Reservations;