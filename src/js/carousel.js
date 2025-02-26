import '../styles/carousel.scss';

// Select all buttons with the data attribute for navigation
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const carousel = button.closest(".carousel");
    const slides = carousel.querySelector(".slides");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    // Loop back to the beginning or end if needed
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    // Update the active slide (using data-active attribute)
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    // Move the slides container to the new position (based on new index)
    const slideWidth = slides.children[0].offsetWidth;
    slides.style.transform = `translateX(-${newIndex * slideWidth}px)`; // Move slides
  });
});

// Function to fetch movie data and populate the carousel
const populateCarousel = async () => {
  try {
    const response = await fetch('/images/sliders/movies.json');
    const jsonData = await response.json();
    console.log('Movies jsonData fetched:', jsonData);

    const slides = document.querySelectorAll(".slides .slide");

    // Add movie jsonData to the first 3 slides
    jsonData.movies.slice(0, 3).forEach((movie, index) => {
      if (slides[index]) {
        slides[index].innerHTML = `
          <img src="${movie.sliderimage}" alt="${movie.title}" />
          <div class="movie-info">
            <h2>${movie.title}</h2>
            <p>${movie.hour}h ${movie.minute}minutes, ${movie.genre}</p>
          </div>
        `;
        slides[index].dataset.active = index === 0 ? true : null;
      }
    });

    // Initial positioning of the slides
    const slideWidth = slides[0].offsetWidth;
    document.querySelector('.slides').style.transform = 'translateX(0)'; 

  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

// Initialize the carousel when the page is loaded
populateCarousel();

const slides = document.querySelectorAll('.slide');

// Define the slider content directly in the code
const sliderContent = [
    {
        title: 'A Study in Scarlet',
        length: '120 min',
        image: '/images/sliders/studie.jpg'
    },
    {
        title: 'Psycho',
        length: '109 min',
        image: '/images/sliders/psycho.jpg'
    },
    {
        title: 'Singing in the Rain',
        length: '103 min',
        image: '/images/sliders/singing.jpg'
    }
];

// Update slides with content
slides.forEach((slide, index) => {
    if (sliderContent[index]) {
        const content = sliderContent[index];
        
        // Set background image
        slide.style.backgroundImage = `url('${content.image}')`;
        
        // Create or update title
        let titleElement = slide.querySelector('.slide-title');
        if (!titleElement) {
            titleElement = document.createElement('h2');
            titleElement.classList.add('slide-title');
            slide.appendChild(titleElement);
        }
        titleElement.textContent = content.title;
        
        // Create or update length
        let lengthElement = slide.querySelector('.slide-length');
        if (!lengthElement) {
            lengthElement = document.createElement('p');
            lengthElement.classList.add('slide-length');
            slide.appendChild(lengthElement);
        }
        lengthElement.textContent = content.length;
    }
});
