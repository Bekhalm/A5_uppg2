import { fetchData } from './helpers/fetchDataHelper.js';
import {
  currentLanguage,
  createLanguageToggleBtn,
} from './components/languageToggleBtn.js';

import { observer } from './helpers/animations/fadeIn.js';
import './components/footer.js';
import './header.js';

import '../styles/about.scss';
import '../styles/languageToggleBtn.scss';

const aboutUsArticle = document.querySelector('.about-us');
const aboutUsContainer = document.querySelector('#about-us-container');

const loadAboutUsItems = async (language) => {
  aboutUsContainer.innerHTML = '';
  
  const data = await fetchData('/Group-d-assignment/database/aboutUs.json');
  
  if (!data || !data.aboutUs || !data.aboutUs[language]) {
    console.error('Invalid data or language not found');
    return;
  }

  const aboutUsItems = {
    introduction: data.aboutUs[language].introduction,
    origin: data.aboutUs[language].origin,
    vision: data.aboutUs[language].vision,
  };

  Object.entries(aboutUsItems).forEach(([key, value]) => {
    const sectionContainer = document.createElement('div');
    sectionContainer.className = `about-us__container about-us__container--${key}`;

    const section = document.createElement('section');
    section.className = `about-us__section about-us__section__${key} `;

    const textContainer = document.createElement('div');
    textContainer.className = `about-us__section__text-container about-us__section__text-container--${key}`;

    const title = document.createElement('h2');
    title.className = `about-us__section__${key}--title`;
    title.textContent =
      value.title.charAt(0).toUpperCase() + value.title.slice(1);

    const paragraph = document.createElement('p');
    paragraph.classList = `about-us__section__${key}--text`;
    paragraph.textContent = value.content;

    const imgContainer = document.createElement('div');
    imgContainer.classList = `about-us__section__${key}__image-container about-us__imgContainer`;

    const image = document.createElement('img');
    image.className = `about-us__section__${key}__image-container--image about-us__imgContainer__image`;
    image.src = value.src;
    image.alt = value.alt;

    imgContainer.appendChild(image);

    textContainer.appendChild(title);
    textContainer.appendChild(paragraph);

    section.appendChild(textContainer);
    section.appendChild(imgContainer);

    sectionContainer.appendChild(section);
    aboutUsContainer.appendChild( sectionContainer );
    
      const tags = document.querySelectorAll('h2, p, img');
      tags.forEach((tag) => {
        if (tag.classList != "header__image") {
          observer.observe(tag);
        }
      } );
    });
  };
  
  
  const loadAboutUsPage = () => {
    const languageTogglerBtn = createLanguageToggleBtn(
      currentLanguage,
      (newLanguage) => {
        loadAboutUsItems(newLanguage);
      },
    );
    
    aboutUsArticle.prepend(languageTogglerBtn);
    
    loadAboutUsItems(currentLanguage);
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  loadAboutUsPage();
  // createFooter();

  const aboutSection = document.querySelector('.about');
  
  // Only try to prepend if the about section exists
  if (aboutSection) {
    const title = document.createElement('h2');
    title.textContent = 'Om oss';
    title.classList.add('about__title');
    aboutSection.prepend(title);
  }
});
