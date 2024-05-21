import apiPath from "src/configs/api-path.constant";


import axios from "src/configs/axios-instances";

const driverApi={
    DriverList:({query,success,error})=>{
        const {
            Driver:{getDriverList},
        }=apiPath;

    axios.getRequest({path:getDriverList,success,error})
    },
    AddDriver:({payload,success,error})=>{
        const {
            Driver:{AddDriver},
        }=apiPath;
        axios.postRequest({path:AddDriver,payload,success,error})
    },
    UpdateDriver:({payload,success,error})=>{
        const {
            Driver:{UpdateDriver},
        }=apiPath;
        axios.putRequest({path:UpdateDriver,payload,success,error})
    },
    GetDriver:({driver_id,payload,success,error})=>{
        const {
            Driver:{GetDriver},
        }=apiPath;
        const pathWithParams=`${GetDriver}/${driver_id}`
        axios.putRequest({path:pathWithParams,payload,success,error})
    },
    
    

};

export default driverApi;