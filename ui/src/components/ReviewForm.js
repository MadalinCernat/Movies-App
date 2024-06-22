import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function ReviewForm({ onSubmit }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reviewText, rating });
    setReviewText('');
    setRating(0);
  };

  return (
    <div className='m-2'>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reviewText">
            <Form.Label>Review Text</Form.Label>
            <Form.Control type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} style={{width: '500px'}}/>
        </Form.Group>
        <Form.Group controlId="rating" className='mt-2'>
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" min="0" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{width: '100px'}}/>
        </Form.Group>
        <Button variant="dark" type="submit" className='mt-2'>
            Submit
        </Button>
        </Form>
    </div>
  );
}

export default ReviewForm;
