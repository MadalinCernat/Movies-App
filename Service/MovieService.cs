
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Models;
using MoviesAPI.Repository;
using System;
using System.Collections.Generic;

namespace MoviesAPI.Service
{
    public class MovieService
    {
        private readonly IRepository<Movie> _movieRepository;

        public MovieService(IRepository<Movie> movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public IEnumerable<Movie> GetAllMovies()
        {
            return _movieRepository.GetAll();
        }

        public Movie GetMovieById(string id)
        {
            return _movieRepository.GetById(id);
        }
        public Movie GetMovieByIdWithReviews(string id)
        {
            return _movieRepository.GetById(id, m => m.Reviews);
        }

        public void AddMovie(Movie movie)
        {
            _movieRepository.Add(movie);
        }

        public void UpdateMovie(string id, Movie updatedMovie)
        {
            try
            {
                _movieRepository.Update(id, updatedMovie);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }

        public void DeleteMovie(string id)
        {
            try
            {
                _movieRepository.Delete(id);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }
    }
}