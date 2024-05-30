using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Models;
using MoviesAPI.Service;
using System;
using System.Collections.Generic;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieReviewsController : ControllerBase
    {
        private readonly MovieReviewService _reviewService;

        public MovieReviewsController(MovieReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public IActionResult GetAllReviews()
        {
            var reviews = _reviewService.GetAllMovieReviews();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public IActionResult GetReviewById(string id)
        {
            var review = _reviewService.GetMovieReviewById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost]
        public IActionResult AddReview(MovieReview review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            review.Id = Guid.NewGuid().ToString();
            _reviewService.AddMovieReview(review);
            return CreatedAtAction(nameof(GetReviewById), new { id = review.Id }, review);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateReview(string id, MovieReview review)
        {
            try
            {
                _reviewService.UpdateMovieReview(id, review);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReview(string id)
        {
            try
            {
                _reviewService.DeleteMovieReview(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
        [HttpGet("{movieId}/reviews")]
        public IActionResult GetReviewsForMovie(string movieId)
        {
            var reviews = _reviewService.GetReviewsForMovie(movieId);
            if (reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }
    }
}
