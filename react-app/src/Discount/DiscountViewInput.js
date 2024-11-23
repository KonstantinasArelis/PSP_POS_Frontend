import {useState} from 'react';
import useFetch from '../useFetch';
import DiscountList from './DiscountList';

const DiscountViewInput = ( {onChange}) => {

    const [isPending, SetIsPending] = useState(false);
    const [page_nr, Setpage_nr] = useState(''); 
    const [limit, Setlimit] = useState('');
    const [id, Setid] = useState('');
    const [type, Settype] = useState('');
    const [valid_starting_from, Setvalid_starting_from] = useState('');
    const [valid_atleast_until, Setvalid_atleast_until] = useState('');
    const [code_hash, Setcode_hash] = useState('');
    
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("reservation filtering is firing of");
        SetIsPending(true);

        const paramaters = {page_nr: page_nr, limit: limit, id: id, type: type, valid_starting_from: valid_starting_from,
            valid_atleast_until: valid_atleast_until, code_hash: code_hash}

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

export default DiscountViewInput;