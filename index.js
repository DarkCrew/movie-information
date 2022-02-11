// https://www.omdbapi.com/?s=spider&apikey=d2643635
// http://www.omdbapi.com/?i=tt0948470&apikey=d2643635

const searchText = document.querySelector('.header-input');
const searchButton = document.querySelector('.header-search-button');
const filmsContainer = document.querySelector('.films-container');
const headerInput = document.querySelector('.header-input');
let filmName = '';



searchButton.addEventListener('click', toggleSearchButton);

headerInput.addEventListener('click', function () {
    searchButton.classList.remove('cross');
});

headerInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && !(searchButton.classList.contains('cross'))) {
        toggleSearchButton();
        searchText.blur();
    }
});

function toggleSearchButton() {
    filmName = (searchText.value).trim();
    loadMovies(filmName);
    if (filmName.length > 0 && !(searchButton.classList.contains('cross'))) {
        searchButton.classList.add('cross');
    } else if (searchButton.classList.contains('cross')) {
        searchButton.classList.remove('cross');
        searchText.value = '';
        searchText.focus();
    }
}

//load movies from API
async function loadMovies(searchName) {
    const URL = `https://www.omdbapi.com/?s=${searchName}&apikey=d2643635`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //    console.log(data.Search)
    if (data.Response === 'True') {
        console.log(data.Search);
        displayListFilms(data.Search);

        
    }else{
        filmsContainer.innerHTML = '';
        let noFilms = document.createElement('h2');
        noFilms.classList.add('no-films');
        noFilms.innerHTML = "We didn't find anything";
        filmsContainer.appendChild(noFilms);
    };
}

function displayListFilms(films) {
    filmsContainer.innerHTML = '';
    for (let i = 0; i < films.length; i++) {
        let filmItem = document.createElement('div');
        filmItem.dataset.id = films[i].imdbID;
        filmItem.classList.add('film-card');
        let titleName = films[i].Title;
        if ((films[i].Title).length > 40){
            titleName = (films[i].Title).substring(0,40) + '...';
        }
        filmItem.innerHTML = `
            <div class="film-card-image">
                <img src="${films[i].Poster}">
            </div>
            <div class="card-info">
                <h2 class="card-title">${titleName}</h2>
                <div class="card-rating"></div>
            </div>
            <div class="card-about-film">
                <h2 class="about-card-title"></h2>
                <p></p>
                <p></p>
                <p></p>
                <p></p>        
            </div>
        `
        filmsContainer.appendChild(filmItem);
    }
    loadFilmRating();
}

function loadFilmRating() {
    const filmRating = document.querySelectorAll('.card-rating');
    const listFilms = document.querySelectorAll('.film-card');
    const cardAboutFilm = document.querySelectorAll('.card-about-film');
    for (let i = 0; i < listFilms.length; i++) {
        async function loadFilmInfo() {
            const currentFilmID = listFilms[i].dataset.id;
            const resultFilm = await fetch(`http://www.omdbapi.com/?i=${currentFilmID}&apikey=d2643635`);
            const dataFilm = await resultFilm.json();
            if (dataFilm.imdbID === currentFilmID) {
                let ratingNumber = document.createElement('h3');
                ratingNumber.classList.add('card-rating-number');
                ratingNumber.textContent = `${dataFilm.imdbRating}`;
                filmRating[i].appendChild(ratingNumber);
            }

            
            cardAboutFilm[i].innerHTML = `
                <h2 class="about-card-title">${dataFilm.Title}</h2>
                <p>Year: ${dataFilm.Year}</p>
                <p>Runtime: ${dataFilm.Runtime}</p>
                <p>Country: ${dataFilm.Country}</p>
                <p>BoxOffice: ${dataFilm.BoxOffice}</p>
            `;
            listFilms[i].appendChild(cardAboutFilm);
        }
        loadFilmInfo();
    }

    const filmCard = document.querySelectorAll('.film-card');
    const filmAboutInfo = document.querySelectorAll('.card-about-film');

    for (let i = 0; i < filmCard.length; i++){
        filmCard[i].addEventListener('mouseenter', function() {
            filmAboutInfo[i].classList.add('show');
        });
        filmCard[i].addEventListener('mouseleave', function() {
            filmAboutInfo[i].classList.remove('show');
        });
    }
}
