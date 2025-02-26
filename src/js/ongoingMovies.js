import '../styles/ongoingMovies.scss';
import { fetchMovieData, moviesArray } from './movies.js';
import { observer } from './helpers/animations/fadeIn.js';

const ongoingMoviesDom = document.querySelector(".ongoingMovies"); 

let genres = [];
let decades = [];

const useData = async () => {
    await fetchMovieData();
    console.log("Data loaded from API, initializing movies");
    InitializeOngoingMovies();
};

document.addEventListener("DOMContentLoaded", useData);

function InitializeOngoingMovies() {
    console.log("Movies array:", moviesArray);
    
    if (!moviesArray.data || moviesArray.data.length === 0) {
        console.log("No movies found");
        return;
    }

    // Use the first 8 movies as "now showing"
    const ongoingMovies = moviesArray.data.slice(0, 8);
    
    ongoingMovies.forEach(movie => {
        createMovieCard(movie);
    });
}

function createMovieCard(movie) {
    console.log("Creating card for movie:", movie);
    
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("ongoingMovies__card");
    cardDiv.style.cursor = 'pointer';
    
    const cardImage = document.createElement("img");
    cardImage.src = movie.attributes.image.url;
    cardImage.classList.add("ongoingMovies__card__image");
    cardImage.alt = movie.attributes.title;
    
    const cardLabel = document.createElement("h3");
    cardLabel.textContent = movie.attributes.title;
    cardLabel.classList.add("ongoingMovies__card__label");
    
    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardLabel);
    ongoingMoviesDom.appendChild(cardDiv);
    
    cardDiv.addEventListener('click', () => {
        window.location.href = `/movie/${movie.id}`;
    });
    
    observer.observe(cardDiv);
} 

function createGenres() {
    for (let currentMovieIndex = 0; currentMovieIndex < moviesArray["movies"].length; currentMovieIndex++) {
        let foundGenre = false; 
        const currentMovie = moviesArray["movies"][currentMovieIndex];
        
        for (let genreIndex = 0; genreIndex < genres.length; genreIndex++) {
            const currentGenre = genres[genreIndex];
            
            if (currentGenre == currentMovie.genre) {
                foundGenre = true 
            }
        }

        if (!foundGenre) {
            genres.push(currentMovie.genre)
        } 
    }
}

function createDecades() {
    for (let currentMovieIndex = 0; currentMovieIndex < moviesArray["movies"].length; currentMovieIndex++) {
        let foundDecade = false; 
        const currentMovie = moviesArray["movies"][currentMovieIndex];
        
        for (let decadeIndex = 0; decadeIndex < decades.length; decadeIndex++) {
            const currentDecade = decades[decadeIndex];
            
            if (currentDecade == currentMovie.decade) {
                foundDecade = true 
            }
        }

        if (!foundDecade) {
            decades.push(currentMovie.decade)
        } 
    }
}


function createFilterProps() {
    const filterDiv = document.createElement("div");
    filterDiv.classList.add("ongoingMovies__filterDiv");
    ongoingMoviesDom.appendChild(filterDiv);

    // Mobile only 
    const selectDiv = document.createElement("div");
    selectDiv.classList.add("ongoingMovies__filterDiv__selectDiv");
    filterDiv.appendChild(selectDiv);

    const filterDropdown = document.createElement("select");
    filterDropdown.classList.add("ongoingMovies__filterDiv__selectDiv__select");
    selectDiv.appendChild(filterDropdown);

    const startingOption = new Option("Välj genre (Ingen vald)");
    startingOption.selected = true;
    startingOption.classList.add("ongoingMovies__filterDiv__selectDiv__select__option");
    filterDropdown.add(startingOption)

    for (let genreIndex = 0; genreIndex < genres.length; genreIndex++) {
        const currentGenre = genres[genreIndex];
        
        let newOption = new Option(currentGenre, "genre_" + currentGenre);

        newOption.classList.add("ongoingMovies__filterDiv__selectDiv__select__option");
        filterDropdown.add(newOption);
    }

    // Desktop
    let genreChipDiv = document.createElement("div");
    genreChipDiv.classList.add("ongoingMovies__filterDiv__genreChipDiv");
    filterDiv.appendChild(genreChipDiv);

    for (let currentIndex = 0; currentIndex < decades.length; currentIndex++) {
        const currentDecade = decades[currentIndex];
        
        let chip = document.createElement("button");
        chip.classList.add("ongoingMovies__filterDiv__genreChipDiv__chip");
        chip.textContent = currentDecade + "-tal";
        genreChipDiv.appendChild(chip);
    }

    for (let currentIndex = 0; currentIndex < genres.length; currentIndex++) {
        const currentGenre = genres[currentIndex];
        
        let chip = document.createElement("button");
        chip.classList.add("ongoingMovies__filterDiv__genreChipDiv__chip");
        chip.textContent = currentGenre;
        genreChipDiv.appendChild(chip);
    }

    let chip = document.createElement("button");
    chip.classList.add("ongoingMovies__filterDiv__genreChipDiv__chip");
    chip.textContent = "Svartvit";
    genreChipDiv.appendChild(chip);

    let filterSearchField = document.createElement("input");
    filterSearchField.classList.add("ongoingMovies__filterDiv__genreChipDiv__searchfield");
    filterSearchField.placeholder = "Sök";
    genreChipDiv.appendChild(filterSearchField);
}