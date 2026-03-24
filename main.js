// 1. تنسيق بسيط للعنوان
if (document.querySelector("h1")) {
    document.querySelector("h1").style.color = "Blue";
}

// 2. المفتاح والروابط (مؤمنة بـ https)
const API_KEY = 'fc1fef96'; 
const movieContainer = document.querySelector(".moviecontainer");
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

async function fetchmovies(searchTerm) {
    // التعديل الأهم: الرابط هنا بقى https عشان جيت هاب يقبله
    const searchUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (movieContainer) {
            movieContainer.innerHTML = ""; // تنظيف النتائج القديمة
            
            if (data.Search && data.Search.length > 0) {
                data.Search.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie_card');
                    
                    // تأمين روابط الصور عشان تظهر على جيت هاب
                    const posterUrl = (movie.Poster && movie.Poster !== 'N/A') 
                        ? movie.Poster.replace('http://', 'https://') 
                        : 'https://via.placeholder.com/250x350?text=No+Poster';

                    movieCard.innerHTML = `
                        <img src="${posterUrl}" alt="${movie.Title}" onclick="goToDetails('${movie.imdbID}')" style="cursor:pointer; width:100%; border-radius:8px;">
                        <h2 style="font-size: 1.1em; margin: 10px 0;">${movie.Title}</h2>
                        <p>${movie.Year} | ${movie.Type}</p>
                    `;
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

// دالة الانتقال لصفحة التفاصيل
function goToDetails(id) {
    // اتأكدي إن اسم الملف التاني عندك هو details.html
    window.location.href = `details.html?id=${id}`;
}

// تشغيل البحث عند الضغط على زرار "بحث"
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchmovies(searchTerm);
        }
    });
}

// تشغيل بحث افتراضي عند فتح الموقع لأول مرة
fetchmovies('Inception');
