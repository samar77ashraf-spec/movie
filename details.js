const urlparams = new URLSearchParams(window.location.search);
const movieId = urlparams.get('id');
async function 
getMovieDetails() {
    const API_KEY = '79958fc0';
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayMovie(data);
}
function displayMovie(movie) {
    const container = document.getElementById('movie-details');
    if (container){
    container.innerHTML = `
    <img src="${movie.Poster}" style="width:200px">
    <h2>${movie.Title} </h2>
    <p>${movie.Plot}</p>;`
}
}
getMovieDetails();