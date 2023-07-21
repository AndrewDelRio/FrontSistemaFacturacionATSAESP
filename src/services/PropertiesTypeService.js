import axios from "axios";
import { environment } from "../environment/Environment";

let propertiesType = {}

export const getPropertyTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPropertyTypes', config).then(res => {
        if (res.data.ok) {
            propertiesType = res.data.result
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getPropertiesType = () => {
    return propertiesType;
}