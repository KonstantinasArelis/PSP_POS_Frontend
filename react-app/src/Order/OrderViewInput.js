import {useState} from 'react';

const ReservationViewInput = ( {onChange}) => {

    const [isPending, SetIsPending] = useState(false);
    const [page_nr, Setpage_nr] = useState('');
    const [limit, Setlimit] = useState('');
    const [id, Setid] = useState('');
    const [business_id, Setbusiness_id] = useState('');
    const [employee_id, Setemployee_id] = useState('');
    const [created_before, Setcreated_before] = useState('');
    const [created_after, Setcreated_after] = useState('');
    const [status, Setstatus] = useState('');
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("reservation filtering is firing of");
        SetIsPending(true);

        const parameters = {page_nr: page_nr, limit: limit, id: id, business_id: business_id, employee_id: employee_id, 
            created_before: created_before, created_after: created_after, status: status
        }

        const validParameters = Object.fromEntries(
            Object.entries(parameters).filter(([_, value]) => value !== '')
        );

        const searchParameters = new URLSearchParams(validParameters);
        const queryParameters = searchParameters.toString();

        SetIsPending(false);
        onChange(queryParameters);
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