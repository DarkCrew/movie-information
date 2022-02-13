// https://www.omdbapi.com/?s=spider&apikey=d2643635
// https://www.omdbapi.com/?i=tt0948470&apikey=d2643635

const searchText = document.querySelector('.header-input');
const searchButton = document.querySelector('.header-search-button');
const filmsContainer = document.querySelector('.films-container');
let filmName = '';


searchButton.addEventListener('click', toggleSearchButton);

searchText.addEventListener('click', function () {
    searchButton.classList.remove('cross');
});

searchText.addEventListener('keydown', function (e) {
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


    } else {
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
        if ((films[i].Title).length > 40) {
            titleName = (films[i].Title).substring(0, 40) + '...';
        }
        const urlImage = films[i].Poster === 'N/A' ? './assets/img/no-image.jpg' : films[i].Poster;

        filmItem.innerHTML = `
            <div class="film-card-image">
                <img src="${urlImage}">
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
                <p class="about-card-rating"></p>       
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
            const resultFilm = await fetch(`https://www.omdbapi.com/?i=${currentFilmID}&apikey=d2643635`);
            const dataFilm = await resultFilm.json();
            if (dataFilm.imdbID === currentFilmID) {
                let ratingNumber = document.createElement('h3');
                ratingNumber.classList.add('card-rating-number');
                const cardRating = dataFilm.imdbRating === 'N/A' ? '0.0' : dataFilm.imdbRating;
                ratingNumber.textContent = `${cardRating}`;
                filmRating[i].appendChild(ratingNumber);
            }

            const title = dataFilm.Title === 'N/A' ? 'no info': dataFilm.Title;
            const year = dataFilm.Year === 'N/A' ? 'no info': dataFilm.Year;
            const runTime = dataFilm.Runtime === 'N/A' ? 'no info': dataFilm.Runtime;
            const country = dataFilm.Country === 'N/A' ? 'no info': dataFilm.Country;
            const rating = dataFilm.imdbRating === 'N/A' ? 'no info': dataFilm.imdbRating;

            cardAboutFilm[i].innerHTML = `
                <h2 class="about-card-title">${title}</h2>
                <p>Year: ${year}</p>
                <p>Runtime: ${runTime}</p>
                <p>Country: ${country}</p>
                <p>Rating: <span>${rating}</span></p> 
            `;
            listFilms[i].appendChild(cardAboutFilm);
        }
        loadFilmInfo();
    }

    const filmCard = document.querySelectorAll('.film-card');
    const filmAboutInfo = document.querySelectorAll('.card-about-film');

    for (let i = 0; i < filmCard.length; i++) {
        filmCard[i].addEventListener('click', function () {
            filmAboutInfo[i].classList.toggle('show');
        });
    }
}

// for test
const filmCard = document.querySelector('.film-card');
const filmAboutInfo = document.querySelector('.card-about-film');

filmCard.addEventListener('click', function () {
    filmAboutInfo.classList.toggle('show');
});      


// media

(function(){
    if(window.innerWidth <= 768){
        searchText.blur();
    }else{
        searchText.focus();
    }
}()); 