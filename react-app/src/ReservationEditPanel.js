import './App.css';
import React, { useState } from 'react';

const ReservationEditPanel = ({ reservation, onRefresh}) => {
  const [business_id, Setbusiness_id] = useState(reservation.business_id);
  const [employee_id, Setemployee_id] = useState(reservation.employee_id);
  const [client_name, Setclient_name] = useState(reservation.client_name);
  const [client_phone, Setclient_phone] = useState(reservation.client_phone);
  const [service_id, Setservice_id] = useState(reservation.service_id);
  const [appointment_time, Setappointment_time] = useState(reservation.appointment_time);
  const [duration, Setduration] = useState(reservation.duration);
  const [ReservationStatus, SetReservationStatus] = useState(reservation.ReservationStatus);

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const updatedReservation = {business_id, employee_id, client_name, client_phone, service_id, appointment_time, duration, ReservationStatus};
    const url = `http://localhost:5274/Reservation/${reservation.id}`;
    fetch(url, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedReservation)
    }).catch(err => {
        console.log("error updating reservation: " + err.name);
    }).then(() => {
      onRefresh();
    })
  };

  return (
    <div>
      <form className="reservationEditPanel" onSubmit={onSubmitHandle}>
        <label htmlFor="business_id">business_id:</label>
        <input 
          type="text" 
          id="business_id" 
          name="business_id" 
          className="reservationEditInput" 
          value={business_id} 
          onChange={(e) => Setbusiness_id(e.target.value)} 
        />

        <label htmlFor="employee_id">employee_id:</label>
        <input 
          type="text" 
          id="employee_id" 
          name="employee_id" 
          className="reservationEditInput" 
          value={employee_id} 
          onChange={(e) => Setemployee_id(e.target.value)} 
        />

        <label htmlFor="client_name">client_name:</label>
        <input 
          type="text" 
          id="client_name" 
          name="client_name" 
          className="reservationEditInput" 
          value={client_name} 
          onChange={(e) => Setclient_name(e.target.value)} 
        />

        <label htmlFor="client_phone">client_phone:</label>
        <input 
          type="text" 
          id="client_phone" 
          name="client_phone" 
          className="reservationEditInput" 
          value={client_phone} 
          onChange={(e) => Setclient_phone(e.target.value)} 
        />

        <label htmlFor="appointment_time">appointment_time:</label>
        <input 
          type="text" 
          id="appointment_time" 
          name="appointment_time" 
          className="reservationEditInput" 
          value={appointment_time} 
          onChange={(e) => Setappointment_time(e.target.value)} 
        />

        <label htmlFor="duration">duration:</label>
        <input 
          type="text" 
          id="duration" 
          name="duration" 
          className="reservationEditInput" 
          value={duration} 
          onChange={(e) => Setduration(e.target.value)} 
        />

        <label htmlFor="ReservationStatus">Status:</label>
        <input 
          type="text" 
          id="ReservationStatus" 
          name="ReservationStatus" 
          className="reservationEditInput" 
          value={ReservationStatus} 
          onChange={(e) => SetReservationStatus(e.target.value)} 
        />

        <label htmlFor="service_id">service_id:</label>
        <input 
          type="text" 
          id="service_id" 
          name="service_id" 
          className="reservationEditInput" 
          value={service_id} 
          onChange={(e) => Setservice_id(e.target.value)} 
        />

        <button type="submit" className="createReservationButton reservationEditSubmit">Confirm edit</button>
      </form>
    </div>
  );
}

export default ReservationEditPanel;