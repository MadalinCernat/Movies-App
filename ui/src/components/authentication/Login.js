import React, { useState, useEffect } from 'react';
import authService from '../../authService';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check if the user is already logged in when the component mounts
        const checkLoggedIn = async () => {
            try {
                // Call a function from authService to check if the user is already logged in
                const isLoggedIn = await authService.isAuthenticated();
                if (isLoggedIn) {
                    // If the user is already logged in, redirect to the profile page
                    navigate('/profile');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoggedIn();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call the login function from authService
            await authService.login(username, password);
            // After successful login, navigate to the profile page
            navigate('/profile');
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Login</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Login
                        </Button>
                    </Form>
                    {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
                    <div className="mt-3">
                        <Link to="/register">
                            <Button variant="dark" className="me-2">
                                Register
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button variant="dark">
                                Home
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
