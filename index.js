// https://www.omdbapi.com/?s=spider&apikey=d2643635
// http://www.omdbapi.com/?i=tt0948470&apikey=d2643635

const searchText = document.querySelector('.header-input');
const searchButton = document.querySelector('.header-search-button');
const filmsContainer = document.querySelector('.films-container');

searchButton.addEventListener('click', function () {
    const filmName = (searchText.value).trim();
    console.log(filmName);
    loadMovies(filmName);
});

//load movies from API
async function loadMovies(searchName) {
    const URL = `https://www.omdbapi.com/?s=${searchName}&apikey=d2643635`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //    console.log(data.Search)
    if (data.Response === 'True') {
        console.log(data.Search);
        displayListFilms(data.Search);
    };
}

function displayListFilms(films) {
    filmsContainer.innerHTML = '';
    for (let i = 0; i < films.length; i++) {
        let filmItem = document.createElement('div');
        filmItem.dataset.id = films[i].imdbID;
        filmItem.classList.add('film-card');
        filmItem.innerHTML = `
            <div class="film-card-image">
                <img src="${films[i].Poster}">
            </div>
            <div class="card-info">
                <h2 class="card-title">${films[i].Title}</h2>
                <div class="card-rating">
                    <h3 class="card-rating-number">6.9</h3>
                </div>
            </div>
        `
        filmsContainer.appendChild(filmItem);
        console.log(filmItem);
    }
}
