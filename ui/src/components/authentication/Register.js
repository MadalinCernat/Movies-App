import React, { useState } from 'react';
import authService from '../../authService';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register(username, password);
            setMessage('Registration successful. You can now login.');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Register</h2>
                    <Form onSubmit={handleRegister}>
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
                            Register
                        </Button>
                    </Form>
                    {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
                    <div className="mt-3">
                        <Link to="/login">
                            <Button variant="dark" className="me-2">
                                Login
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

export default Register;
