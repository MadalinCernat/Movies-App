using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // Dummy in-memory store for demo purposes
    private static List<User> users = new List<User>();
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        if (users.Any(u => u.Username == user.Username))
        {
            return BadRequest("User already exists");
        }

        users.Add(user);
        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User login)
    {
        var existingUser = users.FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);
        if (existingUser == null)
        {
            return Unauthorized("Invalid credentials");
        }

        // Generate JWT token
        var token = GenerateJwtToken(login.Username);

        return Ok(new { token });
    }
    private string GenerateJwtToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: new[] { new Claim(ClaimTypes.Name, username) },
            expires: DateTime.UtcNow.AddMinutes(1), // Token expiry time (adjust as needed)
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
public class User
{
    public string Username { get; set; }
    public string Password { get; set; }
}
