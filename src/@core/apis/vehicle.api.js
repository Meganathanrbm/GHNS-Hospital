import apiPath from "src/configs/api-path.constant";
import axios from "src/configs/axios-instances";

const vehicleApi={
    VehicleList:({query,success,error})=>{
        const {
            Vehicle:{getVehicleList},
        }=apiPath;

    axios.getRequest({path:getVehicleList,success,error})
    },
    AddVehicle:({payload,success,error})=>{
        const {
            Vehicle:{AddVehicle},
        }=apiPath;
        console.log(AddVehicle);
        axios.postRequest({path:AddVehicle,payload,success,error})
    },
    UpdateVehicle:({payload,success,error})=>{
        const {
            Vehicle:{UpdateVehicle},
        }=apiPath;
        axios.putRequest({path:UpdateVehicle,payload,success,error})
    },
    GetVehicle:({vehicle_id,payload,success,error})=>{
        const {
            Vehicle:{GetVehicle},
        }=apiPath;
        const pathWithParams=`${GetVehicle}/${vehicle_id}`
        axios.putRequest({path:pathWithParams,payload,success,error})
    },
    AmbulanceOwnerList:({query,success,error})=>{
        const {
            AmbulanceOwner:{getAmbulanceOwnerList},
        }=apiPath;

    axios.getRequest({path:getAmbulanceOwnerList,success,error})
    },
    AddAmbulanceOwner:({payload,success,error})=>{
        const {
            AmbulanceOwner:{AddAmbulanceOwner},
        }=apiPath;
        axios.postRequest({path:AddAmbulanceOwner,payload,success,error})
    },
    UpdateAmbulanceOwner:({payload,success,error})=>{
        const {
            AmbulanceOwner:{UpdateAmbulanceOwner},
        }=apiPath;
        axios.putRequest({path:UpdateAmbulanceOwner,payload,success,error})
    },
    GetAmbulanceOwner:({ambulance_owner_id,payload,success,error})=>{
        const {
            AmbulanceOwner:{GetAmbulanceOwner},
        }=apiPath;
        const pathWithParams=`${GetAmbulanceOwner}/${ambulance_owner_id}`
        axios.putRequest({path:pathWithParams,payload,success,error})
    },
    

};

export default vehicleApi;