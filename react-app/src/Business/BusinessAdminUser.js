import { useEffect, useState } from "react";
import SingleBusiness from "./SingleBusiness";

const BusinessAdminUser = () => {
    const [data,SetData] = useState(null);

    const url = `http://localhost:5274/Business`;
    useEffect(() => {
        fetch(url, {
            method: 'GET'
        }).then(res => {
            if(!res.ok) {
                throw Error(res.status + "error");
            }
            return res.json();
        }).then(data => {
            SetData(data);
            console.log(data);
        }).catch(err => {
            console.error("Error fetching business data", err);
        })
    }, [])

    return(
        <div>
            <h2>Admin User Business View:</h2>
            {data && data.map(business => (
                <div key={business.id}>
                    <SingleBusiness Business={business}/>
                </div>
            ))}
        </div>
    )
}

export default BusinessAdminUser;