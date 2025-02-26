export const createLogo = ()=> {
  const headerContainer = document.querySelector(".header__container");
  const stripeContainer = document.createElement("div");
  stripeContainer.classList.add("stripe__container");
  headerContainer.appendChild(stripeContainer);

  const stripeBeige = document.createElement("div");
  stripeBeige.classList.add("stripe__container__beige");
  stripeContainer.appendChild(stripeBeige);

  const stripeOrange = document.createElement("div");
  stripeOrange.classList.add("stripe__container__orange");
  stripeContainer.appendChild(stripeOrange);

  const stripeRed = document.createElement("div");
  stripeRed.classList.add("stripe__container__red");
  stripeContainer.appendChild(stripeRed);

  const stripeCyan = document.createElement("div");
  stripeCyan.classList.add("stripe__container__cyan");
  stripeContainer.appendChild(stripeCyan);

  const headerImage = document.createElement("img");
  headerImage.classList.add("header__image");
  headerImage.width = "400";
  stripeContainer.appendChild(headerImage);

  const headerLogoContainer = document.createElement("div");
  headerLogoContainer.classList.add("header__logo__container");
  const headerLogo = document.createElement("h1");
  headerLogo.classList.add("header__logo");
  headerLogo.innerText = "Retro";
  headerLogoContainer.appendChild(headerLogo);

  const headerLogoText = document.createElement("h3");
  headerLogoText.classList.add("header__logo__text");
  headerLogoText.innerText = "- Filmer från förr -";
  headerLogoContainer.appendChild(headerLogoText);

  headerContainer.appendChild(headerLogoContainer);

  const cityName = document.createElement("h1");
  cityName.classList.add("city__name");
  cityName.innerText = "VÄSTERÅS";
  headerContainer.appendChild(cityName);
}