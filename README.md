This app is a comprehensive system that allows users to manage a collection of movies and their reviews through a robust backend API and an interactive frontend interface. The backend is built with ASP.NET Core, featuring user authentication, rate limiting, and a clean, layered architecture. The frontend is a React application that provides an intuitive interface for users to interact with the API, including features for user registration, login, movie and review management, and data visualization. This application ensures a seamless experience for managing movies and reviews, with modern development practices, offline support, and containerized deployment.

# MoviesAPI

MoviesAPI is a RESTful web API built with ASP.NET Core that allows users to manage a collection of movies and their reviews. This project includes various modern development practices and tools, such as dependency injection, layered architecture following SOLID principles, JWT authentication, and more.

## Features

- **Movies Management**: Create, read, update, and delete movies.
- **Reviews Management**: Create, read, update, and delete reviews for movies.
- **Authentication**: User registration and login with JWT token generation.
- **Rate Limiting**: Limits the rate of requests to the API.
- **Dependency Injection**: To manage dependencies and promote loose coupling.
- **Layered Architecture**: Clean separation of concerns following SOLID principles.
- **Unit Testing**: NUnit tests with mocking.
- **Docker**: Containerization for easy deployment.
- **Entity Framework Core**: ORM for database operations with SQL Server.

## Getting Started

### Prerequisites

- [.NET SDK 5.0 or later](https://dotnet.microsoft.com/download)
- SQL Server
- Docker (for containerization)
- Visual Studio or Visual Studio Code

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/MoviesAPI.git
    cd MoviesAPI
    ```

2. Set up the database:

    Ensure your SQL Server is running and update the connection string in `appsettings.json`:

    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=your_server;Database=MoviesDB;User Id=your_user;Password=your_password;"
    }
    ```

3. Run database migrations:

    ```bash
    dotnet ef database update
    ```

4. Build and run the application:

    ```bash
    dotnet build
    dotnet run
    ```

### Docker

1. Build the Docker image:

    ```bash
    docker build -t moviesapi .
    ```

2. Run the Docker container:

    ```bash
    docker run -d -p 8080:80 moviesapi
    ```

## Usage

### Endpoints

#### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get a movie by ID
- `POST /api/movies` - Add a new movie
- `PUT /api/movies/{id}` - Update a movie by ID
- `DELETE /api/movies/{id}` - Delete a movie by ID
- `GET /api/movies/{id}/reviews` - Get reviews for a specific movie

#### Reviews

- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/{id}` - Get a review by ID
- `POST /api/reviews` - Add a new review
- `PUT /api/reviews/{id}` - Update a review by ID
- `DELETE /api/reviews/{id}` - Delete a review by ID
- `GET /api/reviews/{movieId}/reviews` - Get all reviews for a specific movie

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token

## Project Structure

- **Controllers**: Define the API endpoints.
- **Models**: Define the data structures.
- **Services**: Contain the business logic.
- **Repositories**: Handle database operations.
- **DTOs**: Data Transfer Objects for API requests and responses.
- **Unit Tests**: NUnit tests for the application.

# Movies React App

This React application serves as the frontend for the MoviesAPI, allowing users to interact with the MoviesAPI to manage movies and reviews. It includes user authentication, movie management, and review management functionalities.

## Functionalities

### Authentication

- **Login**: Users can log in with their credentials to gain access to additional features like adding and managing movies and reviews.
- **Register**: New users can register for an account.
- **Profile**: Logged-in users can view and manage their profile information.

### Movie Management

- **Home**: Displays a list of movies with pagination. Users can view, edit, or delete movies. Movies can be sorted by year.
- **Add Movie**: Allows users to add new movies to the collection.
- **Edit Movie**: Enables users to edit existing movie details.
- **Delete Movie**: Users can delete movies from the collection.
- **Movie Details**: Displays detailed information about a movie, including its reviews.

### Review Management

- **Add Review**: Users can add reviews to movies.
- **View Reviews**: Movie details page shows all reviews for the selected movie, along with the average rating.
- **Offline Handling**: Reviews added while offline are stored locally and synchronized with the server once the connection is restored.

### Data Visualization

- **Director Pie Chart**: A bar chart visualization of the number of movies directed by each director, displayed on the Home page.

### Network Handling

- **Offline Support**: The app detects when it goes offline and informs the user. Changes made while offline are saved locally and synchronized with the server when the connection is restored.

## Project Structure

- **components/**: Contains all React components, including authentication components (Login, Register, Profile), movie management components (Home, Add, Edit, Details), and the DirectorPieChart component.
- **utils/**: Contains utility functions for network handling.
- **api.js**: Handles API calls to the MoviesAPI.
- **App.js**: Main app component that sets up routing and network connection handling.




## Acknowledgements

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0)
- [NUnit Documentation](https://nunit.org/)
- [Docker Documentation](https://docs.docker.com/)
