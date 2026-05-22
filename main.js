window.goToDetails = function(id) {
    window.location.href = "details.html?id=" + id;
};

const API_KEY = "fc1fef96"; 
const movieContainer = document.querySelector(".moviecontainer");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

async function fetchmovies(searchTerm) {
    const searchUrl = "https://www.omdbapi.com/?s=" + searchTerm + "&apikey=" + API_KEY;
    
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (movieContainer) {
            movieContainer.innerHTML = ""; 
            
            if (data.Search && data.Search.length > 0) {
                data.Search.forEach(function(movie) {
                    const movieCard = document.createElement("div");
                    movieCard.classList.add("movie_card");
                    
                    const posterUrl = (movie.Poster && movie.Poster !== "N/A") 
                        ? movie.Poster.replace("http://", "https://") 
                        : "https://via.placeholder.com/250x350?text=No+Poster";

                    // استخدمنا الجمع العادي بدل التمبلت ليترالز عشان نتفادى مشاكل الـ Paste
                    movieCard.innerHTML = 
                        '<img src="' + posterUrl + '" alt="' + movie.Title + '" onclick="goToDetails(\'' + movie.imdbID + '\')" style="cursor:pointer;">' +
                        '<h2 style="font-size: 1.1em; margin: 10px 0;">' + movie.Title + '</h2>' +
                        '<p>' + movie.Year + ' | ' + movie.Type + '</p>';
                    
                    movieContainer.appendChild(movieCard);
                });
            } else {
                movieContainer.innerHTML = "<p style='color:white;'>عذراً، لم نجد نتائج للبحث.</p>";
            }
        }
    } catch (error) {
        console.error("fetch error:", error);
    }
}

if (searchForm) {
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchmovies(searchTerm);
        }
    });
}

fetchmovies("Inception");
