import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: () => {
    const url = `/cart`;
    return axiosClient.get(url);
  },

  postUpdateCart: (requestBody) => {
    const url = `/cart/update`;
    return axiosClient.post(url, requestBody);
  },

  postDeleteCart: (requestBody) => {
    const url = "/cart/delete";
    return axiosClient.post(url, requestBody);
  },

  // deleteToCart: (requestBody) => {
  //   const url = `/carts/delete`;
  //   return axiosClient.post(url, requestBody);
  // },

  // putToCart: (requestBody) => {
  //   const url = `/carts/update`;
  //   return axiosClient.post(url, requestBody);
  // },
};

export default CartAPI;
