import request from 'supertest';
import axios from 'axios';  //Axios för http förfrågningar.
import app from '../server.js'; //Express appen som ska testas.

// Två variabler som används i testet
describe('Integration Tests', function() {
  let validMovieIds = [];   //Lista med ID:n på filmerna.
  let movieTitles = {}; // Objekt med ID:t som nyckel och titeln som värde.

  // Innan testerna körs: Hämta alla filmer, avgörande. 
  beforeAll(async function() {
    try {
      const movies = await getValidMovies(); // Hämtar filmer från API
      validMovieIds = movies.map(movie => movie.id); // Array, lista med id för att kunna testa filmerna. 
     
      movieTitles = movies.reduce((acc, movie) => {  // Ett objekt där varje ID kopplas till sin titel.
        acc[movie.id] = movie.attributes.title; 
        return acc;
      }, {});
      console.log('Hämtade filmtitlar:', movieTitles);
    } catch (error) {
      console.error('Setup failed:', error);  //Console loggar ifall att det skulle gå fel vid uppstart. 
    }
  });

  // Nu: Testa att varje sida visar rätt titel.
  it('ska visa rätt titel för varje film', async function() { // Loopa igen varje ID.
    for (const id of validMovieIds) {
      const response = await request(app)
        .get(`/movie/${id}`)  // Går till varje "filmsida".
        .expect('Content-Type', /html/)
        .expect(200);
      
      expect(response.text).toContain(movieTitles[id]); // Kontrollera att html-svaret ger rätt filmtitel. 
    }
  });

  // Testar att en icke-existerande film ger 404, dock endast relevant vid url-manipulering.
  it('ska returnera 404 för en film som inte finns', async function() {
    const response = await request(app)
      .get('/movie/nonexistentid') // Använd en film med ett ogiltigt ID
      .expect('Content-Type', /html/)
      .expect(404);
    
    expect(response.text).toContain('Movie not found');
  });
});

// Funktion för att hämta filmer från API:t
async function getValidMovies() {
  try {
    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    return response.data?.data || [];  // Returnerar data om filmer
  } catch (error) {
    console.error('Fel vid hämtning av filmer:', error);
    return [];  // Om något går fel, returneras en tom array
  }
}
