import apiPath from "src/configs/api-path.constant";

import axios from "src/configs/axios-instances";

const HospitalApi={
    HospitalList:({query,success,error})=>{
        const {
            Hospital:{getHospitalList},
        }=apiPath;

    axios.getRequest({path:getHospitalList,success,error})
    },
    AddHospital:({payload,success,error})=>{
        const {
            Hospital:{AddHospital},
        }=apiPath;
        console.log(AddHospital);
        axios.postRequest({path:AddHospital,payload,success,error})
    },
    UpdateHospital:({payload,success,error})=>{
        const {
            Hospital:{UpdateHospital},
        }=apiPath;
        axios.putRequest({path:UpdateHospital,payload,success,error})
    },
    GetHospital:({hospital_id,payload,success,error})=>{
        const {
            Hospital:{GetHospital},
        }=apiPath;
        const pathWithParams=`${GetHospital}/${hospital_id}`
        axios.putRequest({path:pathWithParams,payload,success,error})
    },
};


export default HospitalApi;