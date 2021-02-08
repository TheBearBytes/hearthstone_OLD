import axiosInstance from "./axiosInstance";

// todo: types
const AuthService = {
    loggedUser: () => axiosInstance.get("loggedUser"),
    login: (variables) => axiosInstance.post("register", variables),
    register: (variables) => axiosInstance.post("register", variables),
}

export default AuthService;
