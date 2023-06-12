import RestaurantResource from '../../data/get-restaurant-resource';
import cardComponent from '../templates/card';
import element from '../../utilities/get-element';
import CardEventHandler from '../../utilities/card-event-handler';
import showAlertAndToast from '../../utilities/show-alert';
import FavoriteButtonHandlerHome from '../../utilities/favorite-button-home-handler';
import loadingCardSkeleton from '../../utilities/loading-home';
import skipToMainContent from '../../utilities/skip-content-handler';

const { getElement, getElementAll } = element;
const homePage = {
  _render() {
    return `
      <prologue-element></prologue-element>
      <main-content></main-content>
      <modal-element></modal-element>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.home'),
      getElement('#main-content'),
    );

    const cardContainer = getElement('.card-container');
    loadingCardSkeleton(cardContainer);

    try {
      const restaurants = await RestaurantResource.getAllDataRestaurant();
      loadingCardSkeleton(cardContainer);
      setTimeout(() => {
        this._renderCardItem(cardContainer, restaurants);
      }, 250);
    } catch (error) {
      showAlertAndToast.alertError(error);
      console.error(error);
      loadingCardSkeleton(cardContainer);
    }
  },

  _renderCardItem(cardContainer, restaurants) {
    cardContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      cardContainer.innerHTML += cardComponent(restaurant);
    });
    const favoriteButtonHandler = new FavoriteButtonHandlerHome({
      favoriteButtonHome: getElementAll('.button-like'),
      rates: getElementAll('.rate'),
      dataRestaurants: restaurants,
    });
    const cardHandler = new CardEventHandler({
      buttonsInfo: getElementAll('.button-info'),
      cards: getElementAll('.card>.overlay'),
      cardsMenu: getElementAll('.wrapper-card-menu'),
      modalBody: getElement('.modal-body'),
      modalParent: getElement('.modal-parent'),
    });
  },
};

export default homePage;
