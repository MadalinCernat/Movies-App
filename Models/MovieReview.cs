using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models
{
    public class MovieReview : BaseEntity
    {
        public string Id { get; set; }

        [Required]
        public string MovieId { get; set; }

        [Required]
        public string ReviewText { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        // Navigation property
        public Movie? Movie { get; set; }
    }
}
