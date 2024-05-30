using MoviesAPI.Models;
using MoviesAPI.Repository;
using System;
using System.Collections.Generic;

namespace MoviesAPI.Service
{
    public class MovieReviewService
    {
        private readonly IRepository<MovieReview> _movieReviewRepository;

        public MovieReviewService(IRepository<MovieReview> movieReviewRepository)
        {
            _movieReviewRepository = movieReviewRepository;
        }

        public IEnumerable<MovieReview> GetAllMovieReviews()
        {
            return _movieReviewRepository.GetAll();
        }

        public MovieReview GetMovieReviewById(string id)
        {
            return _movieReviewRepository.GetById(id);
        }

        public void AddMovieReview(MovieReview movieReview)
        {
            _movieReviewRepository.Add(movieReview);
        }

        public void UpdateMovieReview(string id, MovieReview updatedMovieReview)
        {
            try
            {
                _movieReviewRepository.Update(id, updatedMovieReview);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }

        public void DeleteMovieReview(string id)
        {
            try
            {
                _movieReviewRepository.Delete(id);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }

        public IEnumerable<MovieReview> GetReviewsForMovie(string movieId)
        {
            var reviews = GetAllMovieReviews();
            var output = new List<MovieReview>();

            foreach (var review in reviews)
            {
                if(review.MovieId == movieId)
                {
                    output.Add(review);
                }
            }

            return output;
        }
    }
}
