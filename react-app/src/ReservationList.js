const ReservationsList = ({reservations}) => {
    console.log(reservations);
    return(
        <div>
            {reservations.map(reservation =>(
                <div key={reservation.id}>
                    <p>id: {reservation.id}</p>
                    <p>business_id: {reservation.business_id}</p>
                    <p>employee_id: {reservation.employee_id}</p>
                    <p>client_name: {reservation.client_name}</p>
                    <p>client_phone: {reservation.client_phone}</p>
                    <p>created_at: {reservation.created_at}</p>
                    <p>last_modified: {reservation.last_modified}</p>
                    <p>appointment_time: {reservation.appointment_time}</p>
                    <p>duration: {reservation.duration}</p>
                    <p>ReservationStatus: {reservation.ReservationStatus}</p>
                    <p>service_id: {reservation.service_id}</p>
                </div>
            ))}
        </div>
    );
}

export default ReservationsList;