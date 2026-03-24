const urlparams = new URLSearchParams(window.location.search);
const movieId = urlparams.get('id');

async function getMovieDetails() {
    // الـ API Key بتاعك شغال تمام
    const API_KEY = '79958fc0';
    
    // تأكدنا إن الرابط يبدأ بـ https
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayMovie(data);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

function displayMovie(movie) {
    const container = document.getElementById('movie-details');
    if (container) {
        // حركة ذكية: لو الصورة جاية بـ http هنحولها لـ https عشان تظهر
        const securePoster = movie.Poster && movie.Poster !== "N/A" 
            ? movie.Poster.replace('http://', 'https://') 
            : 'https://via.placeholder.com/200x300?text=No+Poster';

        container.innerHTML = `
            <img src="${securePoster}" style="width:200px; border-radius: 8px; margin-bottom: 15px;">
            <h2 style="color: #333;">${movie.Title}</h2>
            <p style="line-height: 1.6;">${movie.Plot}</p>
        `;
    }
}

getMovieDetails();
