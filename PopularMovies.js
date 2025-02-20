const API_KEY = '6a2863399991ca1db02fee37d29257d6'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; 

async function fetchMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);    
  const data = await response.json();
  document.getElementById('moviesTitle').textContent = "Popular Movies"; // Reset title
  displayMovies(data.results);
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    document.getElementById('moviesTitle').textContent = `Results for: "${query}"`; // Update title
    displayMovies(data.results);
  }
});

// Enable search via the Enter key
document.getElementById('searchInput').addEventListener('keydown', async (event) => {
  if (event.key === "Enter") {
    document.getElementById('searchBtn').click();
  }
});

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

      movieContainer.appendChild(movieCard);
    });
  }
}

document.addEventListener('DOMContentLoaded', fetchMovies);