//import "../styles/main.scss";
import "./aboutUs.js";
import './header.js';
import "./ongoingMovies.js";
import "./upcomingMovies.js";
import './components/footer.js';
import './carousel.js';


import { fetchMovieData, moviesArray } from './movies.js';

export const initializeMovieData = async () => {
  await fetchMovieData(); // Ensure the data is fetched before proceeding
  console.log("Data loaded in main.js:", moviesArray);
};

export { moviesArray }; // Re-export the array