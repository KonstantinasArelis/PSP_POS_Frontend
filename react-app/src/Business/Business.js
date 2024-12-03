import BusinessAdminUser from "./BusinessAdminUser";
import BusinessRegularUser from "./BusinessRegularUser";


const Business = () => {
    return (
        <div> 
            <BusinessRegularUser/>
            <BusinessAdminUser/>
        </div>
    )
}

export default Business;