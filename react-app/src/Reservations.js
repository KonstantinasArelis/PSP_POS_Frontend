import ReservationsList from "./ReservationList";
import useFetch from "./useFetch";
import {Link} from "react-router-dom"

const Reservations = () => {
    //const { error, isPending, data: reservations } = useFetch('http://localhost:5274/order?employee_id=123&min_total_amount=50&max_total_amount=1000&order_status=OPEN&page_nr=0&limit=25')
    const { error, isPending, data: reservations } = useFetch('http://localhost:5274/Reservation')


    return(
        <div>
            <Link to="/CreateReservation">Create Reservation:</Link>
            <h2>Reservations:</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {reservations && <ReservationsList reservations={reservations}></ReservationsList>}
            
        </div>
    );
}

export default Reservations;