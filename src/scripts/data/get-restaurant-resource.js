import axios from 'axios';
import API_ENDPOINT from '../global/api-endpoint';

class RestaurantResource {
  constructor() {
    this._configPostReview = {
      header: {
        'Content-Type': 'application/json',
      },
    };
  }

  static async getAllDataRestaurant() {
    try {
      const { data } = await axios.get(API_ENDPOINT.LIST);
      return data.restaurants;
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan untuk mendapatkan data restoran');
      } else if (err.request) {
        throw new Error('Permintaan data restoran ke server gagal');
      } else {
        throw new Error('Terjadi kesalahan/error dalam pengambilan data');
      }
    }
  }

  static async getDataDetailRestaurant(id) {
    try {
      const { data } = await axios.get(`${API_ENDPOINT.DETAIL}/${id}`);
      return data.restaurant;
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan untuk mendapatkan data detail restoran');
      } else if (err.request) {
        throw new Error('Permintaan data detail restoran ke server gagal');
      } else {
        throw new Error('Terjadi kesalahan/error dalam pengambilan data');
      }
    }
  }

  static async postReviewRestaurant(dataPost) {
    try {
      const { data } = await axios.post(API_ENDPOINT.POST_REVIEW, dataPost, this._configPostReview);
      return {
        messagePost: 'Review berhasil ditambahkan',
        response: data,
      };
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan untuk posting review restoran');
      } else if (err.request) {
        throw new Error('Permintaan untuk posting review  ke server gagal');
      } else {
        throw new Error('Terjadi kesalahan/error dalam posting review');
      }
    }
  }
}

export default RestaurantResource;
