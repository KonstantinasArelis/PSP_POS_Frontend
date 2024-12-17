import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

const API_BASE_URL = "http://localhost:5274";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const { authToken } = await response.json();

            const decodedToken = jwtDecode(authToken);
            const businessId = decodedToken.businessId;
            const role = decodedToken.role;
            
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userRole", role);
            localStorage.setItem("businessId", businessId);

            return { authToken, role, businessId };
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await login(username, password);
            if (response) {
                onLogin(); // Notify parent of login success
                setSuccess(true);
            } else {
                setError("Login failed. Access denied.");
            }
        } catch (err) {
            setError(err.message || "Login failed. Please check your credentials.");
        }
    };    
    

    const autofill = () => {
        setUsername("Admin");
        setPassword("Owner123*");
    };

    const loginWindow = (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Login</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">Login successful!</Alert>}
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </FormGroup>
                        <Button type="submit" block>
                            Login
                        </Button>
                        <Button onClick={() => autofill()} block>
                            Autofill
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

    return loginWindow;
};

export default Login;
