import {useState} from 'react';
import '../App.css';

const EditBusinessPanel = ({id, onRefresh}) => {
    const [isPanelVisible, SetIsPanelVisible] = useState(false);
    const [name, SetName] = useState(null);
    const [address, SetAdress] = useState(null);
    const [phone, SetPhone] = useState(null);
    const [email, SetEmail] = useState(null);
    const [currency, SetCurrency] = useState(null);

    const url = `http://localhost:5274/Business/${id}`;

    const handleEditBusiness = (e) => {
        e.preventDefault();
        const newBusiness = {name, address, phone, email, currency};

        fetch(url, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBusiness)
        }).then(() => {
            console.log("Business updated");
        }).catch(err => {
            console.log("error updating business: " + err.name);
        }).then(() => {
            onRefresh();
        })
        SetIsPanelVisible(false);
    }


    return (
        <div>
            <div className="button-group">
                <button onClick={() => {SetIsPanelVisible(true)}} className='createReservationButton CreateBusinessButton'>Edit Business</button>
            </div>
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
                        <div className="button-group">
                            <button onClick={handleEditBusiness} className='createReservationButton CreateBusinessButton'>
                                Submit
                            </button>
                            <button onClick={() => {SetIsPanelVisible(false)}} className='createReservationButton CreateBusinessButton'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default EditBusinessPanel;