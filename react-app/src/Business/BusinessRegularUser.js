import { useState, useEffect } from 'react';
import SingleBusiness from './SingleBusiness';

const BusinessRegularUser = () => {
    const [data,SetData] = useState(null);
    const [business_id, SetBusiness_id] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("businessId");
        if (id) {
            SetBusiness_id(parseInt(id, 10));
        }
    }, []);

    const url = `http://localhost:5274/Business/${business_id}`;
    useEffect(() => {
        fetch(url, {
                method: 'GET'
            }).then(res => {
                if(!res.ok) {
                    throw Error(res.status + 'error');
                }
                return res.json();
            }).then( data => {
                SetData(data);
                console.log(data);
            }).catch(err => {
                console.error("Error fetching business data", err);
            })
    }, [business_id]);
    


    return(
        <div>
            <h2>Business View: </h2>
            
            {data && <SingleBusiness Business={data}/>}
        </div>
    )
}

export default BusinessRegularUser;