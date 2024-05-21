import apiPath from "src/configs/api-path.constant";

import axios from "src/configs/axios-instances";


const patientApi={
    patientList:({query,success,error})=>{
        const {
            patient:{getPatientList},
        }=apiPath;

    axios.getRequest({path:getPatientList,success,error})
    },
    AddPatient:({payload,success,error})=>{
        const {
            patient:{AddPatient},
        }=apiPath;
        axios.postRequest({path:AddPatient,payload,success,error})
    },
    UpdatePatient:({payload,success,error})=>{
        const {
            patient:{UpdatePatient},
        }=apiPath;
        axios.putRequest({path:UpdatePatient,payload,success,error})
    },
    GetPatient:({patient_id,payload,success,error})=>{
        const {
            patient:{GetPatient},
        }=apiPath;
        const pathWithParams=`${GetPatient}/${patient_id}`
        axios.putRequest({path:pathWithParams,payload,success,error})
    },
    PatientRelationList:({query,success,error})=>{
        const {
            patient:{PatientRelationList},
        }=apiPath;
        axios.getRequest({path:PatientRelationList,success,error})
    },
    GetPatientRelation:({patient_relations_id,payload,success,error})=>{
        const {
            patient:{GetPatientRelation},
        }=apiPath;
        const pathWithParams=`${GetPatientRelation}/${patient_relations_id}`
        axios.getRequest({path:pathWithParams,payload,success,error})
    },
    AddPatientRelation:({payload,success,error})=>{
        const {
            patient:{AddPatientRelation},
        }=apiPath;
        axios.postRequest({path:AddPatientRelation,payload,success,error})
    },
    UpdatePatientRelation:({payload,success,error})=>{
        const {
            patient:{UpdatePatientRelation},
        }=apiPath;
        axios.putRequest({path:UpdatePatientRelation,payload,success,error})
    },

}

export default patientApi;