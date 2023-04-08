import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: () => {
    const url = `/users/cart`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/users/cart/${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
