import { useState, useEffect } from 'react';
import SingleBusiness from './SingleBusiness';

const BusinessRegularUser = () => {
    const [data,SetData] = useState(null);
    const id = 2; //remove later

    const url = `http://localhost:5274/Business/${id}`;
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
    }, [id]);
    


    return(
        <div>
            <h2>Regular User Business View: </h2>
            
            {data && <SingleBusiness Business={data}/>}
        </div>
    )
}

export default BusinessRegularUser;