import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import cardComponent from '../templates/card';
import templateListFavoriteRestaurantEmpty from '../templates/empty-list-favorite-restaurant';
import CardEventHandler from '../../utilities/card-event-handler';
import FavoriteButtonHandlerHome from '../../utilities/favorite-button-home-handler';
import element from '../../utilities/get-element';
import showAlertAndToast from '../../utilities/show-alert';
import skipToMainContent from '../../utilities/skip-content-handler';

const { getElement, getElementAll } = element;
const { getAllFavoriteRestaurants } = favoriteRestaurantIDB;

const favoritePage = {
  _render() {
    return `
    <favorite-content></favorite-content>
    <modal-element></modal-element>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.favorite'),
      getElement('#main-content-favorite'),
    );

    try {
      const dataRestaurantsFromIDB = await getAllFavoriteRestaurants();
      if (!dataRestaurantsFromIDB.length) {
        getElement('.content-favorite').innerHTML += templateListFavoriteRestaurantEmpty();
      }
      const cardContainer = getElement('.card-container-favorite');
      dataRestaurantsFromIDB.forEach((restaurant) => {
        cardContainer.innerHTML += cardComponent(restaurant);
      });
      const favoriteButtonHandler = new FavoriteButtonHandlerHome({
        favoriteButtonHome: getElementAll('.button-like'),
        rates: getElementAll('.rate'),
        dataRestaurants: dataRestaurantsFromIDB,
      });
    } catch (error) {
      showAlertAndToast.alertError(error);
      console.error(error);
    } finally {
      const cardHandler = new CardEventHandler({
        buttonsInfo: getElementAll('.button-info'),
        cards: getElementAll('.card>.overlay'),
        cardsMenu: getElementAll('.wrapper-card-menu'),
        modalBody: getElement('.modal-body'),
        modalParent: getElement('.modal-parent'),
      });
    }
  },
};

export default favoritePage;
