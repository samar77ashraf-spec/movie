document.querySelector("h1").style.color = "Blue";
const API_KEY = 'fc1fef96'; // استخدمي المفتاح الجديد ده أضمن
const movieContainer = document.querySelector(".moviecontainer");
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

async function fetchmovies(searchTerm) {
    // التعديل الجوهري: إضافة حرف s لـ https وتغيير المفتاح
    const searchUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        movieContainer.innerHTML = "";
        
        if (data.Search && data.Search.length > 0) {
            data.Search.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie_card');
                
                // تأمين رابط البوستر عشان يظهر على جيت هاب
                const posterUrl = (movie.Poster && movie.Poster !== 'N/A') 
                    ? movie.Poster.replace('http://', 'https://') 
                    : 'https://via.placeholder.com/250x350?text=No+Poster';

                movieCard.innerHTML = `
                    <img src="${posterUrl}" alt="${movie.Title}" onclick="goToDetails('${movie.imdbID}')" style="cursor:pointer; width:100%; border-radius:8px;">
                    <h2 style="font-size: 1.2em; margin: 10px 0;">${movie.Title}</h2>
                    <p>${movie.Year} | ${movie.Type}</p>
                `;
                movieContainer.appendChild(movieCard);
            });
        } else {
            movieContainer.innerHTML = "<p>لم يتم العثور على أفلام.</p>";
        }
    } catch (error) {
        console.error("fetch error:", error);
        movieContainer.innerHTML = "<p>حدث خطأ أثناء تحميل الأفلام. جربي لاحقاً.</p>";
    }
}

// دالة الانتقال لصفحة التفاصيل
function goToDetails(id) {
    // اتأكدي إن اسم الملف عندك details.html فعلاً
    window.location.href = `details.html?id=${id}`;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchmovies(searchTerm);
    }
});

// تشغيل البحث الافتراضي عند فتح الصفحة
fetchmovies('matrix');
