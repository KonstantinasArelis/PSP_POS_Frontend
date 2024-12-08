import {useState} from 'react';
import useFetch from '../useFetch';
import TaxList from './TaxList';

const TaxViewInput = ( {onChange}) => {

    const [isPending, SetIsPending] = useState(false);
    const [page_nr, Setpage_nr] = useState(''); 
    const [limit, Setlimit] = useState('');
    const [id, Setid] = useState('');
    const [tax_name, Settax_name] = useState('');
    const [tax_rate, Settax_rate] = useState('');
    const [is_valid, Setis_valid] = useState('');

    
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("tax filtering is firing of");
        SetIsPending(true);

        const paramaters = {page_nr: page_nr, limit: limit, id: id, tax_name: tax_name, tax_rate: tax_rate, is_valid: is_valid}

        const validParamaters = Object.fromEntries(
            Object.entries(paramaters).filter(([_, value]) => value !== '')
        );

        const searchParamaters = new URLSearchParams(validParamaters);
        const querryParamaters = searchParamaters.toString();

        SetIsPending(false);
        onChange(querryParamaters);
        //useFetch('http://localhost:5274/Tax?${querryParamaters}');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTax = {
            tax_name: tax_name || null, 
            tax_rate: tax_rate || null, 
            is_valid: is_valid || null
        }
    
        try {
            const serializedTax = JSON.stringify(newTax);
    
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const response = await fetch("http://localhost:5274/Tax/", {
                method: "POST",
                body: serializedTax,
                headers: headers
            });
    
            if (response.ok) {
                //const createdTax = await response.json();
                //window.location.href = window.location.href + "/" + createdTax.id;
                window.location.reload();
            } else {
                console.error("Failed to create tax. Response status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred while creating the tax:", error);
        }
    }

    // return(
    //     <div>
    //         <form onSubmit={HandleSubmit}>
    //             <label>id:</label>
    //             <input
    //             type="text"
    //             required
    //             value={id}
    //             onChange={(e) => Setid(e.target.value)}
    //             ></input>
    //             {!isPending && <button>Submit</button>}
    //             {isPending && <button disabled>Loading...</button>}
    //         </form>
    //     </div>
    // );

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Tax Name:</label>
                <input
                    type="text"
                    value={tax_name}
                    onChange={(e) => Settax_name(e.target.value)}
                /><br/>

                <label>Tax Rate:</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={tax_rate}
                    onChange={(e) => Settax_rate(e.target.value)}
                /><br/>

                <label>Is Valid:</label>
                <input
                    type="checkbox"
                    checked={is_valid || false}
                    onChange={(e) => Setis_valid(e.target.checked)}
                /><br/>


                {!isPending && <button type="submit">Create Tax</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
    );
}

export default TaxViewInput;