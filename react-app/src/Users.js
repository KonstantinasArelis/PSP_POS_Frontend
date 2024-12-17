import { useEffect, useState } from "react";
import axios from 'axios';

const Users = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        password: '',
        businessId: '',
        userRole: 'EMPLOYEE'
    });
    const [business_id, SetBusiness_id] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [message, setMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);
    
    useEffect(() => {
        const id = localStorage.getItem("businessId");
        if (id) {
            SetBusiness_id(parseInt(id, 10));
        }
    }, []);

    console.log("bussines_id", business_id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'confirmPassword') {
            setPasswordMatch(value === formData.password);
        }
        
        if (name === 'password') {
            setPasswordValid(passwordRegex.test(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            setMessage('Passwords do not match.');
            return;
        }

        if (!passwordValid) {
            setMessage('Password must be at least 8 characters, contain uppercase, lowercase letters, a number, and a special character.');
            return;
        }

        const token = localStorage.getItem("authToken");

        if (!token) {
            setMessage("No authentication token found. Please log in.");
            return;
        }

        console.log(formData);
        console.log(formData.businessId);

        try {
            const response = await axios.post(
                'http://localhost:5274/auth/register/user',
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            console.log("response", response);
            setMessage('User registered successfully!');
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );
        }
    };

    if (userRole === "EMPLOYEE") {
        return <p>You do not have permission to register users.</p>;
    }

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {!passwordValid && (
                    <p style={{ color: 'red' }}>
                        Password must be at least 8 characters, contain an uppercase, lowercase letters, a number, and a special character.
                    </p>
                )}
                <br />
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                <br />
                <label>
                    Business ID:
                    <input
                        type="text"
                        name="businessId"
                        value={userRole === 'OWNER' ? business_id : formData.businessId}
                        onChange={handleChange}
                        disabled={userRole === 'OWNER'}
                        required
                    />
                </label>
                {userRole === "OWNER" ? (
                    <>
                        <br />
                        <label>
                            User Role:
                            <select
                                name="userRole"
                                value="EMPLOYEE"
                                onChange={handleChange}
                                disabled
                            >
                                <option value="EMPLOYEE">Employee</option>
                            </select>
                        </label>
                        <br />
                    </>
                ) : (
                    <>
                        <br />
                        <label>
                            User Role:
                            <select
                                name="userRole"
                                value={formData.userRole}
                                onChange={handleChange}
                                required
                            >
                                <option value="EMPLOYEE">Employee</option>
                                <option value="OWNER">Owner</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                        </label>
                        <br />
                    </>
                )}
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Users;