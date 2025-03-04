const API_KEY = '6a2863399991ca1db02fee37d29257d6';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Ensure search elements exist before adding event listeners
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchInput && searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    }
  });

  // Enable search via the Enter key
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
}

// Function to fetch movies based on search query
async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  
  const moviesTitle = document.getElementById('moviesTitle');
  if (moviesTitle) moviesTitle.textContent = `Results for: "${query}"`;

  displayMovies(data.results);
}

// Function to display search results
function displayMovies(movies) {
    const movieContainer = document.getElementById('movies'); 
    movieContainer.innerHTML = ''; 

    if (movies.length === 0) {
        movieContainer.innerHTML = "<p>No results found.</p>";
    } else {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average}</p>
                <p>${movie.release_date}</p>
            `;
            movieCard.addEventListener('click', () => selectMovie(movie)); // Click to review
            movieContainer.appendChild(movieCard);
        });
    }
}

function selectMovie(movie) {
    document.getElementById('selectedMovieTitle').textContent = `Review: ${movie.title}`;
    document.getElementById('reviewForm').style.display = "block"; // Show review form
    document.getElementById('submitReview').onclick = () => submitReview(movie);
}

function submitReview(movie) {
    const reviewText = document.getElementById('reviewText').value.trim();
    const reviewRating = document.getElementById('reviewRating').value;
    
    if (!reviewText) {
        alert("Please enter a review.");
        return;
    }

    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `<strong>${movie.title}</strong> - ⭐ ${reviewRating}<br>${reviewText}`;
    document.getElementById('reviewsList').appendChild(reviewItem);
    
    document.getElementById('reviewText').value = ""; // Clear review text
    document.getElementById('reviewForm').style.display = "none"; // Hide form after submission
}