import axiosClient from "./axiosClient";

const UserAPI = {
  checkSession: () => {
    const url = "/check-session";
    return axiosClient.get(url);
  },
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (requestBody) => {
    const url = `/users/signup`;
    return axiosClient.post(url, requestBody);
  },
  postSignIn: (requestBody) => {
    const url = `/users/signin`;
    return axiosClient.post(url, requestBody);
  },
  getOut: () => {
    const url = `/users/logout`;
    return axiosClient.get(url);
  },
};

export default UserAPI;
