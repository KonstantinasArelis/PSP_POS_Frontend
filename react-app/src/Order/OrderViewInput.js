import {useState} from 'react';

const ReservationViewInput = ( {props}) => {

    const [isPending, SetIsPending] = useState(false);
    const [page_nr, Setpage_nr] = useState("");
    const [limit, Setlimit] = useState("");
    const [min_total_amount, Setmin_total_amount] = useState("");
    const [max_total_amount, Setmax_total_amount] = useState("");
    const [min_tax_amount, Setmin_tax_amount] = useState("");
    const [max_tax_amount, Setmax_tax_amount] = useState("");
    const [min_discount_amount, Setmin_discount_amount] = useState("");
    const [max_discount_amount, Setmax_discount_amount] = useState("");
    const [min_order_discount_percentage, Setmin_order_discount_percentage] = useState("");
    const [max_order_discount_percentage, Setmax_order_discount_percentage] = useState("");
    const [created_before, Setcreated_before] = useState("");
    const [created_after, Setcreated_after] = useState("");
    const [closed_before, Setclosed_before] = useState("");
    const [closed_after, Setclosed_after] = useState("");
    const [order_status, Setorder_status] = useState("");

    const [onChange, employee_id] = props;
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("reservation filtering is firing of");
        SetIsPending(true);

        const parameters = {page_nr: page_nr, limit: limit, employee_id: employee_id,
            min_total_amount: min_total_amount, max_total_amount: max_total_amount,
            min_tax_amount: min_tax_amount, max_tax_amount: max_tax_amount,
            min_discount_amount: min_discount_amount, max_discount_amount: max_discount_amount,
            min_order_discount_percentage: min_order_discount_percentage, 
            max_order_discount_percentage: max_order_discount_percentage,
            created_before: created_before, created_after: created_after,
            closed_before: closed_before, closed_after: closed_after,
            order_status: order_status
        }

        const validParameters = Object.fromEntries(
            Object.entries(parameters).filter(([_, value]) => value !== '')
        );

        const searchParameters = new URLSearchParams(validParameters);
        const queryParameters = "?" + searchParameters.toString();

        SetIsPending(false);
        onChange(queryParameters);
    }


    return(
        <div>
            <form onSubmit={HandleSubmit}>
                <label>page: </label>
                <input
                type="number"
                value={page_nr} min="0" step="1" 
                onChange={(e) => Setpage_nr(e.target.value)}/>
                <br></br>

                <input
                type="number"
                value={min_total_amount} min="0" step="0.01" 
                onChange={(e) => Setmin_total_amount(e.target.value)}/>

                <label> ≤ total amount ≤ </label>
                <input
                type="number"
                value={max_total_amount} min="0" step="0.01" 
                onChange={(e) => Setmax_total_amount(e.target.value)}/>
                <br></br>
                
                <input
                type="number"
                value={min_tax_amount} min="0" step="0.01" 
                onChange={(e) => Setmin_tax_amount(e.target.value)}/>

                <label> ≤ tax amount ≤ </label>
                <input
                type="number"
                value={max_tax_amount} min="0" step="0.01" 
                onChange={(e) => Setmax_tax_amount(e.target.value)}/>
                <br></br>

                <input
                type="number"
                value={min_discount_amount} min="0" step="0.01" 
                onChange={(e) => Setmin_discount_amount(e.target.value)}/>

                <label> ≤ discount amount ≤ </label>
                <input
                type="number"
                value={max_discount_amount} min="0" step="0.01" 
                onChange={(e) => Setmax_discount_amount(e.target.value)}/>
                <br></br>

                <input
                type="number"
                value={min_order_discount_percentage} min="0" step="1" 
                onChange={(e) => Setmin_order_discount_percentage(e.target.value)}/>

                <label> ≤ order discount percentage ≤ </label>
                <input
                type="number"
                value={max_order_discount_percentage} min="0" step="1" 
                onChange={(e) => Setmax_order_discount_percentage(e.target.value)}/>
                <br></br>
                
                <input
                type="date"
                value={created_before}
                onChange={(e) => Setcreated_before(e.target.value)}/>
                
                <label> ≤ created at ≤ </label>
                <input
                type="date"
                value={created_after}
                onChange={(e) => Setcreated_after(e.target.value)}/>
                <br></br>

                <input
                type="date"
                value={closed_before}
                onChange={(e) => Setclosed_before(e.target.value)}/>

                <label> ≤ closed after ≤ </label>
                <input
                type="date"
                value={closed_after}
                onChange={(e) => Setclosed_after(e.target.value)}/>
                <br></br>

                <label>status: </label>
                <select value={order_status} onChange={e => Setorder_status(e.target.value)}>
                        <option value="">-</option>
                        <option value="OPEN">Open</option>
                        <option value="PENDING_PAYMENT">Pending payment</option>
                        <option value="CLOSED">Closed</option>
                </select>
                {!isPending && <button>Search</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
    );
}

export default ReservationViewInput;