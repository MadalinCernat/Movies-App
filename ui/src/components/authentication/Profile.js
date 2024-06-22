// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../authService';

function Profile() {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setUsername(user.username);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <Container style={{ marginTop: '2rem' }}>
            <h2>Profile</h2>
            {isAuthenticated ? (
                <p>Welcome, {username}!</p>
            ) : (
                <p>You are not logged in. Please <Link to="/login">login</Link> to view your profile.</p>
            )}
            <Link to="/">
                <Button variant="secondary">Home</Button>
            </Link>
        </Container>
    );
}

export default Profile;
