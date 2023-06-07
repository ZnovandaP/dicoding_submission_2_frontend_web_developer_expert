import { async } from 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.css';
import '../sass/main.scss';
import './view/component/all-component';
import App from './view/app';
import './utilities/get-current-year';
import element from './utilities/get-element';
import swRegister from './utilities/sw-register';

const { getElementAll, getElement } = element;

const app = new App({
  main: element.getElement('#main'),
  header: getElement('header'),
  navbar: getElement('.navbar'),
  hero: getElement('.hero'),
  navLinks: getElementAll('.nav-link'),
});

window.addEventListener('hashchange', () => {
  app._renderPage();
  app.resetActiveNavLink();
  app.activeNavLinkBaseOnUrl();
  app.showHeroBaseOnUrl();
  app.activeNavbarFirstLoaded();
  app.scrolltoTop();
});

window.addEventListener('load', async () => {
  await swRegister();
  app._renderPage();
  app.activeNavLinkBaseOnUrl();
  app.showHeroBaseOnUrl();
  app.activeNavbarFirstLoaded();
});

window.addEventListener('DOMContentLoaded', () => {
  // generateCard();
});

// favoriteRestaurantIDB.getAllFavoriteRestaurants().then(h => console.log(h));
