
// const BASEURL = import.meta.env.VITE_BACKEND_URL;
const BASEURL = "http://localhost:8008/v1";

const setBaseUrlPrefix = (path) => {
  return BASEURL.concat(path);
};

const apiPathConstants = {
  auth: {
    verifySession: setBaseUrlPrefix("/verify-session"),
    handlelogin:setBaseUrlPrefix("/login/hospitalLogin")
  },
  patient: {
    getPatientList: setBaseUrlPrefix("/patient/getPatientList"),
    AddPatient: setBaseUrlPrefix("/patient/savePatient"),
    UpdatePatient: setBaseUrlPrefix("/patient/savePatient"),
    GetPatient: setBaseUrlPrefix("/patient/getPatientList"),
    UpdatePatientRelation: setBaseUrlPrefix("/patient-relations/udpatePatientRelation"),
    GetPatientRelation: setBaseUrlPrefix("/patient-relations/getPatientRelationList"),
    AddPatientRelation: setBaseUrlPrefix("/patient-relations/savePatientRelation"),
    PatientRelationList: setBaseUrlPrefix("/patient-relations/getPatientRelationList"),
  },
  Vehicle: {
    getVehicleList:setBaseUrlPrefix("/vehicle/getVehicleList"),
    AddVehicle:setBaseUrlPrefix("/vehicle/saveVehicle"),
    UpdateVehicle:setBaseUrlPrefix("/vehicle/udpateVehicle"),
    getVehicle:setBaseUrlPrefix("/vehicle/getVehicleList")
  },
 AmbulanceOwner:{
  getAmbulanceOwner:setBaseUrlPrefix("/ambulance-owner/getAmbulanceOwnerList"),
  getAmbulanceOwnerList:setBaseUrlPrefix("/ambulance-owner/getAmbulanceOwnerList"),
  AddAmbulanceOwner:setBaseUrlPrefix("/ambulance-owner/saveAmbulanceOwner"),
  UpdateAmbulanceOwner:setBaseUrlPrefix("/ambulance-owner/updateAmbulanceOwner")
 },
 Driver:{
  getDriver:setBaseUrlPrefix("/driver/getDriverList"),
  getDriverList:setBaseUrlPrefix("/driver/getDriverList"),
  AddDriver:setBaseUrlPrefix("/driver/saveDriver"),
  UpdateDriver:setBaseUrlPrefix("/driver/updateDriver"),
 },
 Hospital:{
  getHospital:setBaseUrlPrefix("/hospital/getHospitalRegisterationList"),
  AddHospital:setBaseUrlPrefix("/hospital/saveHospitalRegisteration"),
  UpdateHospital:setBaseUrlPrefix("/hospital/updateHospitalRegisteration")
 }
};

export default apiPathConstants;
