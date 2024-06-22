import React, { useState, useEffect } from 'react';
import { Button, Card, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieById, addMovieReview } from './api';
import ReviewForm from './ReviewForm';

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    useEffect(() => {
        if (movie) {
            calculateAverageRating(reviews);
        }
    }, [movie]);
    
    const handleReviewSubmit = async (reviewData) => {
        reviewData.movieId = id;
        reviewData.movie = null;
        reviewData.Id = "0";
        await addMovieReview(reviewData);
        setShowReviewForm(false);
      };

    const fetchMovie = async (id) => {
        try {
            const data = await getMovieById(id);
            setMovie(data);
            setReviews(data.reviews.$values || []);
            calculateAverageRating(reviews);
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            setAverageRating(0);
            return;
        }
        
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating.toFixed(1)); // Round to one decimal place
    };

    return (
        <div>
            {movie ? (
                <Card className='text-center'>
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{movie.genre}</Card.Subtitle>
                        <Card.Text>
                            Director: {movie.director}<br />
                            Year: {movie.year}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
            <h4 className='text-center mt-2'>Reviews</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4 text-center">
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{review.reviewText}</h5>
                                    <p className="card-text">Rating: {review.rating}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
            <p className='text-center mt-2'>Average Rating: {averageRating}</p>
            <Button onClick={() => setShowReviewForm(!showReviewForm)} className='m-2' variant="dark">
                {showReviewForm ? 'Hide Review Form' : 'Add Review'}
            </Button>
            {showReviewForm && <ReviewForm onSubmit={handleReviewSubmit}/>}
            <div className='d-flex justify-content-center'>
                <Link to="/" className='text-center mt-2'>
                    <Button variant="dark"  className='mt-2'>Back</Button>
                </Link>
            </div>
        </div>
    );
}

export default Details;
