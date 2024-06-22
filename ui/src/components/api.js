export async function fetchMovies(){
    try {
        const response = await fetch('https://localhost:7129/api/Movies');
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        // Assuming the array is stored under a key called "movies" in the response object
        const moviesArray = data.$values || [];
        return moviesArray;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export async function addMovie(movieData) {
    try {
        const response = await fetch('https://localhost:7129/api/Movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) {
            throw new Error('Failed to add movie');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


export const deleteMovie = async (id) => {
    try {
        const response = await fetch(`https://localhost:7129/api/Movies/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
        return;
    } catch (error) {
        throw error;
    }
};


export const updateMovie = async (id, updatedMovie) => {
    try {
        const response = await fetch(`https://localhost:7129/api/Movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMovie)
        });

        if (!response.ok) {
            throw new Error('Failed to update movie');
        }

        return;
    } catch (error) {
        throw error;
    }
};
export const getMovieById = async (id) => {
    try {
        const response = await fetch(`https://localhost:7129/api/Movies/${id}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching movie:', error);
    }
};

export async function fetchMovieReviews(movieId) {
    try {
        const response = await fetch(`https://localhost:7129/api/MovieReviews/${movieId}/reviews`);

        if (!response.ok) {
            throw new Error('Failed to fetch movie reviews');
        }

        const data = await response.json();
        return data.$values;
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        throw error;
    }
}

export async function addMovieReview(reviewData) {
    console.log(reviewData);
    try {
        const response = await fetch('https://localhost:7129/api/MovieReviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) {
            throw new Error('Failed to add movie review');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding movie review:', error);
        throw error;
    }
}


