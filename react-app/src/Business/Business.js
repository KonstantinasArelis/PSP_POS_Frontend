import { useEffect, useState } from "react";
import BusinessAdminUser from "./BusinessAdminUser";
import BusinessRegularUser from "./BusinessRegularUser";


const Business = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    if (!userRole) {
        return <div>Loading...</div>;
    }

    console.log("userRole", userRole);

    return (
        <div>
            {userRole === "SUPER_ADMIN" || userRole === "OWNER" ? (
                <BusinessAdminUser /> 
            ) : userRole === "EMPLOYEE" ? (
                <BusinessRegularUser />
            ) : (
                <div>Unauthorized access</div>
            )}
        </div>
    );
};

export default Business;