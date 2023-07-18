import axios from "axios";
import { environment } from "../environment/Environment";

let economicDestinationList = [];

export const getEconomicDestinationProperty = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getEconomicalDestine', config).then(
        res => {
            if (res.data.ok) {
                economicDestinationList = res.data.result
                resolve(true)
            }
        }
    ).catch(err => {
        reject(err)
    })
})

export const getEconomicDestinationList = () => {
    return economicDestinationList;
}