import axios from "../custom-axios/axios";

const AuthenticationService = {
  signup: (email, password, fullName) => {
    // let formData = new FormData();
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("fullName", fullName);
    let credentials = {
      email: email,
      password: password,
      firstName: fullName,
      lastName: fullName,
      username: fullName,
    };

    return axios.post("users/signup", credentials);
  },

  login: (email, password) => {
    // let formData = new FormData();
    // formData.append("email", email);
    // formData.append("password", password);
    let credentials = {
      username: email,
      password: password,
    };

    return axios.post("users/login", credentials);
  },

  getUserEmail: () => {
    return axios.get("users/getEmail");
  },

  setAuthToken: (token) => {
    // if (token !== null) axios.defaults.headers.common["x-access-token"] = token;
    // else delete axios.defaults.headers.common["x-access-token"];;
    if (token !== null)
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    else delete axios.defaults.headers.common["Authorization"];
  },
};

export default AuthenticationService;
