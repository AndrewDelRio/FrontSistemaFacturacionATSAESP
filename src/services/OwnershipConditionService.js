import axios from "axios";
import { environment } from "../environment/Environment";

let ownershipConditionList = {}

export const getOwnerShipConditions = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getOwnerShipConditions', config).then(res => {
        if (res.data.ok) {
            ownershipConditionList = res.data.result
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getOwnerShipConditionsList = () => {
    return ownershipConditionList;
}