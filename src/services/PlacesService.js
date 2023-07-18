import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];
let municipalities = [];

export const getDepartmets = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getDepartments', config).then(
        res => {
            if (res.data.ok) {
                departments = res.data.result
                resolve(true)
            }
        }).catch(
            err => {
                reject(err)
            }
        )
})

export const getDepartmentsList = () => {
    return departments;
}

export const getMunicipalities = (id_department) => {

    new Promise((resolve, reject) => {
        const config = {
            headers: {
                token: sessionStorage.getItem('token')
            }
        }
        axios.get(environment.APIHost + '/getMunicipalitiesByDpt/' + id_department, config).then(
            res => {
                if (res.data.ok) {
                    municipalities = res.data.result
                    resolve(true)
                }
            }).catch(
                err => {
                    reject(err)
                }
            )
    })
}

export const getMunicipalitiesList = (id_department) => {
    getMunicipalities(id_department);
    return municipalities;
}