import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card, Pagination, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate} from 'react-router-dom';
import DirectorPieChart from './DirectorPieChart';
import { fetchMovies, deleteMovie } from './api';

function Home() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(5);
    const [sortByYear, setSortByYear] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchMovies();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    const sortedMovies = sortByYear ? [...movies].sort((a, b) => a.year - b.year) : movies.slice();

    const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleSort = () => {
        setSortByYear(prevSortByYear => !prevSortByYear);
    };

    const handleDelete = async (id) => {
        try {
            await deleteMovie(id);
            await fetchData();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const confirmDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            handleDelete(id);
        }
    };

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">MoviesApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ margin: "5rem", textAlign: "center" }}>
                <div>
                    <Link className='d-grid gap-2' to="/create">
                        <Button size="lg" variant="dark">Create</Button>
                    </Link>
                </div>
                <div className="card-container">
                    {currentMovies && currentMovies.length > 0 ? (
                        currentMovies.map((item) => (
                            <Card key={item.id} style={{ width: '100%', margin: '0.5rem 0' }}>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.genre}</Card.Subtitle>
                                    <Card.Text>
                                        Director: {item.director}<br />
                                        Year: {item.year}
                                    </Card.Text>
                                    <Link to={`/details/${item.id}`}>
                                        <Button variant="dark">Details</Button>
                                    </Link>
                                    &nbsp;
                                    <Link to={`/edit/${item.id}`}>
                                        <Button variant="dark">Edit</Button>
                                    </Link>
                                    &nbsp;
                                    <Button onClick={() => confirmDelete(item.id)} variant="dark">Delete</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <br />
                <Pagination>
                    {Array.from({ length: Math.ceil(sortedMovies.length / moviesPerPage) }, (_, i) => (
                        <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <Button onClick={toggleSort} variant="dark">Sort by year</Button> {}
            </div>
            <DirectorPieChart movies={sortedMovies} />
            
        </Fragment>
    );
}

export default Home;
