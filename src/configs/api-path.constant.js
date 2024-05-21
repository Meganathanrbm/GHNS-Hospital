
// const BASEURL = import.meta.env.VITE_BACKEND_URL;
const BASEURL = "http://localhost:8008/v1";

const setBaseUrlPrefix = (path) => {
  return BASEURL.concat(path);
};

const apiPathConstants = {
  auth: {
    verifySession: setBaseUrlPrefix("/verify-session"),
    login:setBaseUrlPrefix("/login/hospitalLogin")
  },
 Hospital:{
  getHospital:setBaseUrlPrefix("/hospital/getHospitalRegisterationList"),
  AddHospital:setBaseUrlPrefix("/hospital/saveHospitalRegisteration"),
  UpdateHospital:setBaseUrlPrefix("/hospital/updateHospitalRegisteration")
 }
};

export default apiPathConstants;
