import { useEffect, useState } from "react";
import './App.css';
import { jwtDecode } from "jwt-decode";

const ReservationFilterPanel = ({ onChange, SetIsFilterPanelVisible }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
      const role = localStorage.getItem("userRole");
      setUserRole(role);
  }, []);

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

  let businessId = "";

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
}, []);

  const [page_nr, Setpage_nr] = useState('');
  const [limit, Setlimit] = useState('');
  const [id, Setid] = useState('');
  const [business_id, Setbusiness_id] = useState('');
  const [employee_id, Setemployee_id] = useState('');
  const [client_name, Setclient_name] = useState('');
  const [client_phone, Setclient_phone] = useState('');
  const [created_before, Setcreated_before] = useState('');
  const [created_after, Setcreated_after] = useState('');
  const [last_modified_before, Setlast_modified_before] = useState('');
  const [last_modified_after, Setlast_modified_after] = useState('');
  const [appointment_time_before, Setappointment_time_before] = useState('');
  const [appointment_time_after, Setappointment_time_after] = useState('');
  const [duration_less_than, Setduration_less_than] = useState('');
  const [duration_more_than, Setduration_more_than] = useState('');
  const [status, Setstatus] = useState('');
  const [service_id, Setservice_id] = useState('');

  const HandleSubmit = (e) => {
    e.preventDefault();

    const parameters = {
      page_nr: page_nr,
      limit: limit,
      id: id,
      business_id: userRole === 'OWNER' ? businessId : business_id,
      employee_id: userRole === 'EMPLOYEE' ? userId : employee_id,
      client_name: client_name,
      client_phone: client_phone,
      created_before: created_before,
      created_after: created_after,
      last_modified_before: last_modified_before,
      last_modified_after: last_modified_after,
      appointment_time_before: appointment_time_before,
      appointment_time_after: appointment_time_after,
      duration_less_than: duration_less_than,
      duration_more_than: duration_more_than,
      status: status,
      service_id: service_id,
    };

    const validParameters = Object.fromEntries(
      Object.entries(parameters).filter(([_, value]) => value !== '')
    );

    const searchParameters = new URLSearchParams(validParameters);
    const queryParameters = searchParameters.toString();

    onChange(queryParameters);
  };

  const handleClose = () => {
    SetIsFilterPanelVisible(false);
  }

  return (
    <div>
      <form onSubmit={HandleSubmit} className="filterPanel">
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => Setid(e.target.value)}
          placeholder="Enter reservation ID"
        />

        <input
          type="number"
          id="page_nr"
          value={page_nr}
          onChange={(e) => Setpage_nr(e.target.value)}
          placeholder="Enter page number"
        />

        <input
          type="number"
          id="limit"
          value={limit}
          onChange={(e) => Setlimit(e.target.value)}
          placeholder="Enter limit"
        />

        {userRole !== 'EMPLOYEE' && (
          <input
            type="text"
            id="business_id"
            value={userRole === 'OWNER' ? businessId : business_id}
            onChange={(e) => Setbusiness_id(e.target.value)}
            placeholder="Enter business ID"
            disabled={userRole === 'OWNER'}
          />
        )}

        {userRole !== 'EMPLOYEE' && (
          <input
            type="text"
            id="employee_id"
            value={employee_id}
            onChange={(e) => Setemployee_id(e.target.value)}
            placeholder="Enter employee ID"
          />
        )}

        <input
          type="text"
          id="client_name"
          value={client_name}
          onChange={(e) => Setclient_name(e.target.value)}
          placeholder="Enter client name"
        />

        <input
          type="text"
          id="client_phone"
          value={client_phone}
          onChange={(e) => Setclient_phone(e.target.value)}
          placeholder="Enter client phone"
        />

        <input
          type="datetime-local"
          id="created_before"
          value={created_before}
          onChange={(e) => Setcreated_before(e.target.value)}
          placeholder="Created before (date and time)"
        />

        <input
          type="datetime-local"
          id="created_after"
          value={created_after}
          onChange={(e) => Setcreated_after(e.target.value)}
          placeholder="Created after (date and time)"
        />

        <input
          type="datetime-local"
          id="last_modified_before"
          value={last_modified_before}
          onChange={(e) => Setlast_modified_before(e.target.value)}
          placeholder="Last modified before (date and time)"
        />

        <input
          type="datetime-local"
          id="last_modified_after"
          value={last_modified_after}
          onChange={(e) => Setlast_modified_after(e.target.value)}
          placeholder="Last modified after (date and time)"
        />

        <input
          type="datetime-local"
          id="appointment_time_before"
          value={appointment_time_before}
          onChange={(e) => Setappointment_time_before(e.target.value)}
          placeholder="Appointment time before (date and time)"
        />

        <input
          type="datetime-local"
          id="appointment_time_after"
          value={appointment_time_after}
          onChange={(e) => Setappointment_time_after(e.target.value)}
          placeholder="Appointment time after (date and time)"
        />

        <input
          type="number"
          id="duration_less_than"
          value={duration_less_than}
          onChange={(e) => Setduration_less_than(e.target.value)}
          placeholder="Duration less than (minutes)"
        />

        <input
          type="number"
          id="duration_more_than"
          value={duration_more_than}
          onChange={(e) => Setduration_more_than(e.target.value)}
          placeholder="Duration more than (minutes)"
        />

        <input
          type="text"
          id="status"
          value={status}
          onChange={(e) => Setstatus(e.target.value)}
          placeholder="Enter status"
        />

        <select onChange={ (e) => Setstatus(e.target.value)}>
            <option value = "RESERVED" > RESERVED</option>
            <option value = "CANCELLED" > CANCELLED</option>
            <option value = "DONE" > DONE</option>
        </select>

        <input
          type="text"
          id="service_id"
          value={service_id}
          onChange={(e) => Setservice_id(e.target.value)}
          placeholder="Enter service ID"
        />

        <button type="submit" className="createReservationButton reservationFilterSubmit">Submit</button>
        <button onClick={handleClose} className="createReservationButton reservationFilterSubmit">Close</button>
      </form>
    </div>
  );
};

export default ReservationFilterPanel;