import axios from "axios";
import { environment } from "../environment/Environment";

let usesPublicServiceList = [];

export const getAllUsesPublicServices = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getAllUsesPublicServices', config).then(res => {
        if (res.data.ok) {
            usesPublicServiceList = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getUsesPublicServiceList = () => {
    return usesPublicServiceList;
}