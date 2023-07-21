import axios from "axios";
import { environment } from "../environment/Environment";

let stratums = [];

export const getStratums = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getStratums', config).then(
        res => {
            if (res.data.ok) {
                stratums = res.data.result
                resolve(true)
            }
        }).catch(
            err => {
                reject(err)
            }
        )
})

export const getStratumsList = () => {
    return stratums;
}