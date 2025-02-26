/// Nya apiet 

let moviesArray = [];

export const fetchMovieData = async () => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        moviesArray = data; // Store the API response
        console.log('Fetched from API:', moviesArray);
        return moviesArray;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export { moviesArray };