import { useEffect, useState } from "react";
import SingleBusiness from "./SingleBusiness";
import CreateBusinessPanel from "./CreateBusinessPanel";
import EditBusinessPanel from "./EditBusinessPanel";

const BusinessAdminUser = () => {
    const [data, SetData] = useState(null);
    const [refreshTrigger, SetRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        SetRefreshTrigger(prevTrigger => prevTrigger + 1);
        console.log("trigger triggered");
    }



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
    }, [refreshTrigger])


    return(
        <div>
            <h2>Admin User Business View:</h2>
            <CreateBusinessPanel/>
            <div className="businessList">
                {data && data.map(business => (
                    
                    <div key={business.id}>
                        <SingleBusiness Business={business}> </SingleBusiness>
                        <EditBusinessPanel id={business.id} onRefresh = {handleRefresh}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BusinessAdminUser;