import axios from "axios";
import { environment } from "../environment/Environment";

let publicServicesList = []

export const getAllServicesPublic = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getAllDomesticPublicServices', config).then(res => {
        if (res.data.ok) {
            publicServicesList = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getServicesPublicList = () => {
    return publicServicesList;
}