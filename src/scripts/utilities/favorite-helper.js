import favoriteRestaurantIDB from '../data/favorite-restaurant-idb';

const { getFavoriteRestaurant } = favoriteRestaurantIDB;

const favoriteHelper = {
  async _isRestaurantExist(id) {
    const restaurant = await getFavoriteRestaurant(id);
    return !!restaurant;
  },

  _createDataRestaurantToIDB(data) {
    return {
      id: data.id,
      pictureId: data.pictureId,
      name: data.name,
      rating: data.rating,
      city: data.city,
    };
  },
};

export default favoriteHelper;
