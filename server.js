import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5080;

// EJS
app.set('view engine', 'ejs');

// Debug image path
const imagePath = path.join(__dirname, 'public/images');
console.log('Serving images from:', imagePath);

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/database', express.static(path.join(__dirname, 'public/database')));
app.use(express.static('public'));
app.use(express.static('dist'));


app.use('/images/sliders', express.static(path.join(__dirname, 'public/images/sliders'))); // Slider images

// Main route
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        res.render('index', { 
            movies: data.data,
            paths: {
                images: '/images',
                sliders: '/images/sliders'
            }
        });
    } catch (error) {
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

// Movie route
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});