using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models
{
    public class Movie : BaseEntity
    {
        public string Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public string Director { get; set; }
        [Required]
        [Range(1900, 2100)]
        public int Year { get; set; }

        // Navigation property for MovieReview
        public ICollection<MovieReview>? Reviews { get; set; }
    }
}
