import express from 'express'; // importerar express ramverk. 
import path from 'path'; // Path modul för filvägar.
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);   //Detta för att hitta rätt filvägar, sker ej automatiskt pga ES-moduler.
const __dirname = path.dirname(__filename);

const app = express(); // Skapar express app
const port = 5080;  //Min valda port

// EJS som template 
app.set('view engine', 'ejs');


const imagePath = path.join(__dirname, 'public/images');
console.log('Serving images from:', imagePath); // Debuggar för bildernas väg.

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/database', express.static(path.join(__dirname, 'public/database')));
app.use(express.static('public'));
app.use(express.static('dist'));


app.use('/images/sliders', express.static(path.join(__dirname, 'public/images/sliders'))); // Slider images

// Visa filmerna på första sidan, hämtade från api:et.
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies'); //Hämtar filmer från API, fetch för senaste uppdateringar.
        const data = await response.json();
        res.render('index', {    //res.render för att skicka data till EJS.
            movies: data.data,
            paths: {
                images: '/images',
                sliders: '/images/sliders'
            }
        });
    } catch (error) {     //Debugg, skickar tom lista om något går fel.
        console.error('Error:', error);
        res.render('index', { 
            movies: [],
            paths: {
                images: '/images',
                sliders: '/images/sliders'
            }
        });
    }
});


app.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        const movie = data.data.find(m => m.id.toString() === movieId);
        
        if (!movie) {
            res.status(404).send('Movie not found');
            return;
        }
        
        
        console.log('Movie data:', movie.attributes);
        
        res.render('movie', { 
            movie,
            introHtml: movie.attributes.intro || movie.attributes.description 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error loading movie');
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);  //Startar servern.
    });
}

export default app;