import "../styles/upcomingMovies.scss";
import { observer } from './helpers/animations/fadeIn.js';
/*
 * Originally made by Magnus Olofsson, modified by Nils Nyberg.
 */
 /*
const upcomingMoviesDom = document.querySelector(".upcomingMovies");

const moviesArray = [
  {
    src: "https://media.istockphoto.com/id/1147544807/sv/vektor/ingen-miniatyr-bild-vektor-grafik.jpg?s=612x612&w=0&k=20&c=RWp5ECPYkIEO8J3zxyvsc4Lrf68NiLDybtPHix_QI1I=",
    movieLabel: "Terminator",
  },
  {
    src: "https://media.istockphoto.com/id/1147544807/sv/vektor/ingen-miniatyr-bild-vektor-grafik.jpg?s=612x612&w=0&k=20&c=RWp5ECPYkIEO8J3zxyvsc4Lrf68NiLDybtPHix_QI1I=",
    movieLabel: "Terminator 2 - Domedagen",
  },
  {
    src: "https://media.istockphoto.com/id/1147544807/sv/vektor/ingen-miniatyr-bild-vektor-grafik.jpg?s=612x612&w=0&k=20&c=RWp5ECPYkIEO8J3zxyvsc4Lrf68NiLDybtPHix_QI1I=",
    movieLabel: "Robocop",
  },
  {
    src: "https://media.istockphoto.com/id/1147544807/sv/vektor/ingen-miniatyr-bild-vektor-grafik.jpg?s=612x612&w=0&k=20&c=RWp5ECPYkIEO8J3zxyvsc4Lrf68NiLDybtPHix_QI1I=",
    movieLabel: "Terminator Salvation",
  },
];

for (let currentIndex = 0; currentIndex < moviesArray.length; currentIndex++) {
  const element = moviesArray[currentIndex];
  createMovieCard({
    src: element.src,
    movieLabel: element.movieLabel,
  });
}

function createMovieCard(props) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("upcomingMovies__card");
  upcomingMoviesDom.appendChild(cardDiv);

  const cardImage = document.createElement("img");
  cardImage.src = props.src;
  cardImage.classList.add("upcomingMovies__card-image");
  cardDiv.appendChild(cardImage);

  const cardLabel = document.createElement("h3");
  cardLabel.innerHTML = props.movieLabel;
  cardLabel.classList.add("upcomingMovies__card-label");
  cardDiv.appendChild(cardLabel);
  observer.observe(cardDiv);
}
*/