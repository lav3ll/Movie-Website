const API_KEY = '617b10abdb679ed96a8521a13cec6aaf';
let searchKey = 'popularity.desc';
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&${searchKey}&with_watch_monetization_types=flatrate&page1`;

const API_URL2 = `https://api.themoviedb.org/3/discover/movie?api_key=617b10abdb679ed96a8521a13cec6aaf`
searchKey = '';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=617b10abdb679ed96a8521a13cec6aaf&query="'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const logInBtn = document.querySelector('.fa-circle-user');
const LogInMdl = document.querySelector('.logInMdl');
const header = document.querySelector('header');
const ttop = document.querySelector('.top');
const password = document.getElementById('password');
const username = document.getElementById('username')
const login = document.querySelector('.login');
const errorTxt = document.getElementById('errorTxt');
const xmark = document.querySelector('.fa-square-xmark');
const overlay = document.querySelector('.overlay');

const populartBtn = document.getElementById('b1');
const releaseBtn = document.getElementById('b2');
const recentlyBtn = document.getElementById('b3');
const homeEl = document.querySelector('.home');
const genreTopBtn = document.querySelector('.genre');
const gnrModal = document.querySelector('.gnr-modal');
const gnrModal2 = document.querySelector('.gnr-modal2');
const gnrBtn = document.querySelector('.gnrBtn')
const upcomingEl = document.querySelectorAll('.upcoming');


//Account Button
logInBtn.addEventListener('click', () => {
    LogInMdl.classList.toggle('disabled');
    overlay.classList.remove('disabled')
})

xmark.addEventListener('click', () => {
    LogInMdl.classList.toggle('disabled');
    overlay.classList.add('disabled')
})

overlay.addEventListener('click', () => {
    LogInMdl.classList.add('disabled');
    overlay.classList.add('disabled')

})


const accounts = new Set;
accounts.add('Lavell');
const passwords = ['test'];

login.addEventListener('click', () => {
    errorTxt.innerHTML = '';



    if (accounts.has(username.value) && passwords.includes(password.value)) {
        errorTxt.innerHTML = 'you have logged in';
    } else {
        errorTxt.innerHTML = 'Incorrect username or password';
    }



    // accounts.add(username.value)
    // if (password.value.length < 8) {
    //     console.log('password is too short')
    // }
    // passwords.push(password.value)


})

//Home Button
homeEl.addEventListener('click', () => {
    window.location.reload();
})

//Get The Genres
getGenres('https://api.themoviedb.org/3/genre/movie/list?api_key=617b10abdb679ed96a8521a13cec6aaf&language=en-US');
async function getGenres(url) {
    const response = await fetch(url)
    const data = await response.json();
    showGenres(data.genres)
    showGenres2(data.genres)
}

var selectedGenre = []
function showGenres(genres) {
    genres.forEach((genre) => {
        const { name } = genre;
        const genreEl = document.createElement('div');
        genreEl.classList.add('genre-buttons');
        genreEl.innerHTML = `${name}`;
        genreEl.id = genre.id;
        gnrModal.appendChild(genreEl)

        genreEl.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                selectedGenre = [];
                selectedGenre.push(genre.id);
            }
            console.log(selectedGenre)
            getMovies(API_URL2 + '&with_genres=' + encodeURI(selectedGenre));

            genreEl.addEventListener('mouseoff', () => {
                gnrModal.classList.toggle('disabled');
            })
        })
    })
}

function showGenres2(genres) {
    genres.forEach((genre) => {
        const { name } = genre;
        const genreEl = document.createElement('div');
        genreEl.classList.add('genre-buttons');
        genreEl.innerHTML = `${name}`;
        genreEl.id = genre.id;
        gnrModal2.appendChild(genreEl)

        genreEl.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                selectedGenre = [];
                selectedGenre.push(genre.id);
            }
            console.log(selectedGenre)
            getMovies(API_URL2 + '&with_genres=' + encodeURI(selectedGenre));

            genreEl.addEventListener('mouseoff', () => {
                gnrModal2.classList.toggle('disabled');
            })
        })
    })
}

genreTopBtn.addEventListener('click', () => {
    gnrModal2.classList.toggle('disabled');
})

console.log(selectedGenre)

gnrBtn.addEventListener('click', () => {
    console.log('click')
    gnrModal.classList.toggle('disabled');
});


//Get Initial Movies
getMovies(API_URL);
async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json();

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `

            <img src="${IMG_PATH + poster_path}"
            alt="movie seats">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
        `

        main.appendChild(movieEl)

    })

}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }

}

//Search Box
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else {

    }
})


//Search Filters
const tags = document.querySelectorAll('.buttons');


setSearch()
function setSearch() {
    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            if (tag.id == 'b1') {
                getMovies(BASE_URL + 'movie/top_rated?api_key=' + API_KEY + '&language=en-US&page=1.desc')
            } else if (tag.id == 'b2') {
                getMovies(API_URL)

            } else if (tag.id == 'b3') {
                getMovies(BASE_URL + '/movie/upcoming?api_key=' + API_KEY + '&language=en-US&page=1')
            }
        })

    })
}

//Burger Bar
const bBar = document.querySelector('.fa-bars');
const modalEl = document.querySelector('.modal');
const body = document.querySelector('main');



bBar.addEventListener('click', () => {
    modalEl.classList.toggle('disabled')
    gnrModal.classList.add('disabled');
});

body.addEventListener('click', () => {
    modalEl.classList.add('disabled');
    gnrModal.classList.add('disabled');
})






