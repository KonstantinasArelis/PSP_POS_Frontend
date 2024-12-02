import clock from './Images/109613.png';
import service from './Images/1005661.png';
import status from './Images/1721936.png';
import employee from './Images/2815428.png';
import React, { useState } from 'react';
import ReservationEditPanel from './ReservationEditPanel.js';

const ReservationsList = ({reservations, onRefresh}) => {
    const [isPanelVisible, setIsPanelVisible] = useState(null);

    
    console.log(reservations);
    reservations = [
    {
          id: 1,
          business_id: 'business123',
          employee_id: 'employee456',
          client_name: 'John Doe',
          client_phone: '555-123-4567',
          created_at: '2024-11-29T10:00:00Z',
          last_modified: '2024-11-29T10:15:00Z',
          appointment_time: '2024-12-05T14:00:00Z',
          duration: 60, // minutes
          ReservationStatus: 'Confirmed',
          service_id: 'service789',
        },
        {
          id: 2,
          business_id: 'business123',
          employee_id: 'employee789',
          client_name: 'Jane Smith',
          client_phone: '555-987-6543',
          created_at: '2024-11-28T16:30:00Z',
          last_modified: '2024-11-29T09:45:00Z',
          appointment_time: '2024-12-01T10:30:00Z',
          duration: 30, // minutes
          ReservationStatus: 'Pending',
          service_id: 'service101',
        },
    ];
    
   
    const handleClick = (id) => {
        
        console.log("reservations with id: " + id + " was clicked");
        if(isPanelVisible === id){
            setIsPanelVisible(null);
        } else{
            setIsPanelVisible(id);
        }
    }

    return(
        <div className="allReservationsContainer">
            {reservations.map(reservation =>(
                <div key={reservation.id} className="reservationContainer">
                    <div onClick={() => handleClick(reservation.id)} className="editClickZone"></div>
                    <p className="reservationId">ID: {reservation.id}</p>
                    <p className="reservationEmployeeId"> <img id="icon"src={employee}/> {reservation.employee_id}</p>
                    <p className="reservationClientName">{reservation.client_name}</p>
                    <p className="reservationClientPhone">{reservation.client_phone}</p>
                    <p className="reservationAppointmentTime">{reservation.appointment_time}</p>
                    <p className="reservationDuration">{reservation.duration} <img id="icon"src={clock}/></p>
                    <p className="reservationReservationStatus"> <img id="icon"src={status}/> {reservation.ReservationStatus}</p>
                    <p className="reservationServiceId"> <img id="icon"src={service}/> {reservation.service_id}</p>
                    
                    {reservation.id === isPanelVisible && (
                        
                        <ReservationEditPanel reservation = {reservation} onRefresh = {onRefresh}></ReservationEditPanel>
                    )}
                </div>
            ))}
        </div>
    );
}

/*
<p className="reservationId">ID: {reservation.id}</p>
                    <p className="reservationBusinessId">business_id: {reservation.business_id}</p>
                    <p className="reservationEmployeeId">employee_id: {reservation.employee_id}</p>
                    <p className="reservationClientName">{reservation.client_name}</p>
                    <p className="reservationClientPhone">client_phone: {reservation.client_phone}</p>
                    <p className="reservationCreatedAt">created_at: {reservation.created_at}</p>
                    <p className="reservationLastModified">last_modified: {reservation.last_modified}</p>
                    <p className="reservationAppointmentTime">{reservation.appointment_time}</p>
                    <p className="reservationDuration">duration: {reservation.duration}</p>
                    <p className="reservationReservationStatus">Status: {reservation.ReservationStatus}</p>
                    <p className="reservationServiceId">service_id: {reservation.service_id}</p>
*/


export default ReservationsList;