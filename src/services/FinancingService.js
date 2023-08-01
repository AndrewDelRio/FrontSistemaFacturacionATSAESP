import axios from "axios";
import { environment } from "../environment/Environment"

let financingsList = {}

export const getAllFinancings = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getAllFinancings', config).then(res => {
        if (res.data.ok) {
            financingsList = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getFinancingList = () => {
    return financingsList;
}