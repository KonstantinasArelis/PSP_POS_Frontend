import { useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { apiService } from "../ApiService.js";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const login = async (username, password) => {
        try {
            const loginRequestDTO = {
                Username: username,
                Password: password,
            };
    
            const response = await apiService.post("/auth/login", loginRequestDTO);
    
            console.log("Login successful:", response);
    
            const authToken = response.data.authToken;
            const role = response.data.role;
            const businessId = response.data.businessId;

            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userRole", role);
            localStorage.setItem("businessId", businessId);
    
            return response;
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
    
        try {
            const response = await login(username, password);
            if (response && response.isSuccess) {
                onLogin();
                setSuccess(true);
            } else {
                setError("Login failed. Access denied.");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            console.log(err);
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
