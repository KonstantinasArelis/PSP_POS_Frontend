import { useEffect, useState } from "react";
import BusinessAdminUser from "./BusinessAdminUser";
import BusinessRegularUser from "./BusinessRegularUser";


const Business = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Get the user's role from localStorage
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    if (!userRole) {
        return <div>Loading...</div>; // Optional: show a loading state while the role is being retrieved
    }

    console.log("userRole", userRole);

    return (
        <div>
            {userRole === "SUPER_ADMIN" || userRole === "OWNER" ? (
                <BusinessAdminUser /> // Show admin view for SUPER_ADMIN or OWNER
            ) : userRole === "EMPLOYEE" ? (
                <BusinessRegularUser /> // Show regular user view for EMPLOYEE
            ) : (
                <div>Unauthorized access</div> // Handle invalid roles if needed
            )}
        </div>
    );
};

export default Business;