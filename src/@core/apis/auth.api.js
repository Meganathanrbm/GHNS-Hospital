// Importing constants
import apiPath from "src/configs/api-path.constant";

import axios from "src/configs/axios-instances";

const authApi = {
  handleLogout: ({ success, error }) => {
    const {
      auth: { logout },
    } = apiPath;
    axios.postRequest({ path: logout, success, error });
  },
  handleLogin: ({ payload, success, error }) => {
    const {
      auth: { login },
    } = apiPath;
    axios.postRequest({ path: login, payload, success, error });
  },
  verifySession: ({ payload, success, error, final }) => {
    const {
      auth: { verifySession },
    } = apiPath;
    axios.postRequest({ path: verifySession, payload, success, error, final });
  }
 
};

export default authApi;
