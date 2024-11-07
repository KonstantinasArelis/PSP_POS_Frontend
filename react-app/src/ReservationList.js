const ReservationsList = ({reservations}) => {

    return(
        <div>
            {reservations.map(reservation =>(
                <div key={reservation.id}>
                    <h2>{reservation.id}</h2>
                    <p>{reservation.total_amount}</p>
                </div>
            ))}
        </div>
    );
}

export default ReservationsList;