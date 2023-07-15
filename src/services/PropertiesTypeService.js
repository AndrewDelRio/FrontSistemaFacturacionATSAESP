import axios from "axios";
import { environment } from "../environment/Environment";

let properiesType = {}

export const getPropertyTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPropertyTypes', config).then(res => {
        if (res.data.ok) {
            properiesType = res.data.result
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getProperiesType = () => {
    return properiesType;
}