using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using MoviesAPI.Service;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly UserService _userService;

    public AuthController(IConfiguration configuration, UserService userService)
    {
        _configuration = configuration;
        _userService = userService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] CredentialsModel register)
    {
        List<User> users = _userService.GetAllUsers().ToList();
        if (users.Any(u => u.Username == register.Username))
        {
            return BadRequest("User already exists");
        }

        User newUser = new User();
        Guid guid = Guid.NewGuid();

        newUser.Id = guid.ToString();
        newUser.Username = register.Username;
        newUser.Password = register.Password;

        _userService.AddUser(newUser);
        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] CredentialsModel login)
    {
        List<User> users = _userService.GetAllUsers().ToList();
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
            expires: DateTime.UtcNow.AddMinutes(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public class CredentialsModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
