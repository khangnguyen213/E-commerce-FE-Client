import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (requestBody) => {
    const url = `/users/send-mail`;
    return axiosClient.post(url, requestBody);
  },
};

export default CheckoutAPI;
