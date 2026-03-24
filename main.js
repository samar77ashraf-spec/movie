document.querySelector("h1").style.color = "Blue";
const API_KEY = '79958fc0';
const movieContainer = document.querySelector(".moviecontainer");
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
async function
  fetchmovies(searchTerm) {
  // "matrix"
  const searchUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`;
  try {
        const response=await
          fetch(searchUrl);
          const data=await
            response.json();
          movieContainer.innerHTML = "";
            if (data.Search &&
          data.Search.length > 0){
          data.Search.forEach(movie => {
            const movieCard = 
            document.createElement('div');
              movieCard.classList
            .add('movie_card');
                const posterUrl
              = movie.Poster !== 'N/A' ?
                movie.Poster : 'https://plachold.co/250x350';
                  movieCard.innerHTML 
                  = `
            <img src="${posterUrl}" alt="${movie.Title} "onclick="goToDetails('${movie.imdbID}')" style="cursor:pointer;">
            <h2>${movie.Title}</h2>
            <p> ${movie.Year}</p>
            <p> ${movie.Type}</p>
          `;
        movieContainer.appendChild(movieCard);
        });
        } 
        else {
      movieContainer.innerHTML = 
      "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error("fetch error:",error);
  }
}
function goToDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm){
  fetchmovies(searchTerm);
  }
});
fetchmovies('matrix');
