import ReservationsList from "./ReservationList";
import ReservationViewInput from "./ReservationViewInput";
import useFetch from "./useFetch";
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import './App.css';
const Reservations = () => {
    //const { error, isPending, data: reservations } = useFetch('http://localhost:5274/order?employee_id=123&min_total_amount=50&max_total_amount=1000&order_status=OPEN&page_nr=0&limit=25')
    const [url, SetUrl] = useState("http://localhost:5274/Reservation");
    const [refreshTrigger, SetRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        SetRefreshTrigger(prevTrigger => prevTrigger + 1);
    }

    useEffect(() => {
    }, [refreshTrigger]); // This effect runs whenever refreshTrigger changes

    const { error, isPending, data: reservations } = useFetch(url, refreshTrigger);
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
            {/*reservations &&  <ReservationsList reservations={reservations}></ReservationsList>*/}
            {reservations && <ReservationsList reservations={reservations} onRefresh={handleRefresh}></ReservationsList>}
        </div>
    );
}

export default Reservations;