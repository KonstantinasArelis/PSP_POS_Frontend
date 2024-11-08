import {useState} from 'react';
import useFetch from './useFetch';
import ReservationsList from './ReservationList';

const ReservationViewInput = ( {onChange}) => {

    const [isPending, SetIsPending] = useState(false);
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
        console.log("reservation filtering is firing of");
        SetIsPending(true);

        const paramaters = {page_nr: page_nr, limit: limit, id: id, business_id: business_id, employee_id: employee_id, 
            client_name: client_name, client_phone: client_phone, created_before: created_before, created_after: created_after, 
            last_modified_before: last_modified_before, last_modified_after: last_modified_after,
            appointment_time_before: appointment_time_before, appointment_time_after: appointment_time_after, 
            duration_less_than: duration_less_than, duration_more_than: duration_more_than, status: status, service_id: service_id
        }

        const validParamaters = Object.fromEntries(
            Object.entries(paramaters).filter(([_, value]) => value !== '')
        );

        const searchParamaters = new URLSearchParams(validParamaters);
        const querryParamaters = searchParamaters.toString();

        SetIsPending(false);
        onChange(querryParamaters);
        //useFetch('http://localhost:5274/Reservation?${querryParamaters}');
    }


    return(
        <div>
            <form onSubmit={HandleSubmit}>
                <label>id:</label>
                <input
                type="text"
                required
                value={id}
                onChange={(e) => Setid(e.target.value)}
                ></input>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
    );
}

export default ReservationViewInput;