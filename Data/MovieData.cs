using Bogus;
using MoviesAPI.Models;

namespace MoviesAPI.Data
{
    public class MovieData
    {
        public static List<Movie> Movies = new List<Movie>
        {
            new Movie
            {
                Id = "1",
                Title = "Goodfellas",
                Genre = "Crime",
                Director = "Martin Scorsese",
                Year = 1990
            },
            new Movie
            {
                Id = "2",
                Title = "Scarface",
                Genre = "Crime",
                Director = "Brian De Palma",
                Year = 1983
            },
            new Movie
            {
                Id = "3",
                Title = "The Godfather",
                Genre = "Crime",
                Director = "Francis Ford Coppola",
                Year = 1972
            },
            new Movie
            {
                Id = "4",
                Title = "The Godfather Part II",
                Genre = "Crime",
                Director = "Francis Ford Coppola",
                Year = 1974
            },
            new Movie
            {
                Id = "5",
                Title = "Casino",
                Genre = "Crime",
                Director = "Martin Scorsese",
                Year = 1995
            },
            new Movie
            {
                Id = "6",
                Title = "Heat",
                Genre = "Crime",
                Director = "Michael Mann",
                Year = 1995
            }
        };


        public static List<Movie> GenerateMovies(int count)
        {
            var faker = new Faker<Movie>()
                .RuleFor(m => m.Id, f => f.Random.Guid().ToString())
                .RuleFor(m => m.Title, f => f.Random.Word())
                .RuleFor(m => m.Genre, f => f.Random.Word())
                .RuleFor(m => m.Director, f => f.Name.FullName())
                .RuleFor(m => m.Year, f => f.Random.Number(1900, DateTime.Now.Year));

            return faker.Generate(count);
        }
    }
}
