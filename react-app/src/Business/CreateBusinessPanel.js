import {useState} from 'react';
import '../App.css';
const CreateBusinessPanel = () => {
    const [isPanelVisible, SetIsPanelVisible] = useState(false);
    const [name, SetName] = useState(null);
    const [address, SetAdress] = useState(null);
    const [phone, SetPhone] = useState(null);
    const [email, SetEmail] = useState(null);
    const [currency, SetCurrency] = useState(null);

    const url = `http://localhost:5274/Business`;

    const handleAddBusiness = (e) => {
        e.preventDefault();
        const newBusiness = {name, address, phone, email, currency};

        fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBusiness)
        }).then(() => {
            console.log("New business created");
        }).catch(err => {
            console.log("error creating business: " + err.name);
        })
        SetIsPanelVisible(false);
    }


    return (
        <div>
            <button onClick={() => {SetIsPanelVisible(true)}} className='createReservationButton CreateBusinessButton'>Add Business</button>
            {isPanelVisible && 
                <div>
                    <form className='CreateReservation CreateBusiness'>
                        <input
                            placeholder='Business Name'
                            value = {name}
                            onChange={(e) => SetName(e.target.value)}
                        ></input>
                        <input
                            placeholder='Business Address'
                            value = {address}
                            onChange={(e) => SetAdress(e.target.value)}
                        ></input>
                        <input
                            placeholder='Business Phone'
                            value = {phone}
                            onChange={(e) => SetPhone(e.target.value)}
                        ></input>
                        <input
                            placeholder='Business Email'
                            value = {email}
                            onChange={(e) => SetEmail(e.target.value)}
                        ></input>
                        <input
                            placeholder='Business Currency'
                            value = {currency}
                            onChange={(e) => SetCurrency(e.target.value)}
                        ></input>
                        <button onClick={handleAddBusiness} className='createReservationButton CreateBusinessButton'>Submit</button>
                        <button onClick={() => {SetIsPanelVisible(false)}} className='createReservationButton CreateBusinessButton'>Cancel</button>
                    </form>
                </div>}
        </div>
    )
}

export default CreateBusinessPanel;