import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie } from './api';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        director: '',
        year: ''
    });

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    const fetchMovie = async (id) => {
        try {
            const data = await getMovieById(id);
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateMovie(id, movie);
            navigate('/');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control type="text" name="title" placeholder="Enter Title" value={movie.title} required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Control type="text" name="genre" placeholder="Enter Genre" value={movie.genre} required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Control type="text" name="director" placeholder="Enter Director" value={movie.director} required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Control type="text" name="year" placeholder="Enter Year" value={movie.year} required onChange={handleChange} />
                </Form.Group>

                <Button onClick={handleSubmit} type="submit" variant="dark">Update</Button>
                <div className='d-flex justify-content-center' mt-2>
                <Link to="/" className='text-center mt-2'>
                    <Button variant="dark" >Back</Button>
                </Link>
            </div>
            </Form>

        </div>
    )
}

export default Edit;
