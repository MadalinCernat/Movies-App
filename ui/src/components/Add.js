import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';
import { fetchMovies, addMovie } from './api';

function Add() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [movies, setMovies] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const movieData = {
            id: "0",
            Title: title,
            Genre: genre,
            Director: director,
            Year: parseInt(year),
            Reviews: []
        };

        try {
            await addMovie(movieData);

            const updatedMovies = await fetchMovies();

            setMovies(updatedMovies);

            navigate('/');

            console.log(updatedMovies);
        } catch (error) {
            console.error('Error adding movie:', error);
            const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
            offlineData.push(movieData);
            localStorage.setItem('offlineData', JSON.stringify(offlineData));
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Control type="text" placeholder="Enter Genre" required onChange={(e) => setGenre(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Control type="text" placeholder="Enter Director" required onChange={(e) => setDirector(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Control type="number" placeholder="Enter Year" required onChange={(e) => setYear(e.target.value)} />
                </Form.Group>

                <Button type="submit" variant="dark">Submit</Button>
                <Link to="/" className='text-center mt-2'>
                    <Button variant="dark" >Back</Button>
                </Link>
            </Form>
        </div>
    )
}

export default Add;
