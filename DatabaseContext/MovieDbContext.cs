using Microsoft.EntityFrameworkCore;
using MoviesAPI.Models;

namespace MoviesAPI.DatabaseContext
{

    using Microsoft.EntityFrameworkCore;

    public class MovieDbContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieReview> MovieReviews { get; set; }
        public DbSet<User> Users { get; set; }

        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieReview>()
                .HasOne(mr => mr.Movie)
                .WithMany(m => m.Reviews)
                .HasForeignKey(mr => mr.MovieId);
        }
    }
}
