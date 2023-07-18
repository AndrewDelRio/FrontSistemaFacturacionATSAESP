import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];

export const getAddressInformationProperty = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getDepartmentsInfo', config).then(resDepartments => {
        if (resDepartments.data.ok) {
            departments = resDepartments.data.result;
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getDepartmentsList = () => {
    return departments;
}