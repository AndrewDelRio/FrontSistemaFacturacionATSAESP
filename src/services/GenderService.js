import axios from "axios";
import { environment } from "../environment/Environment";

let genders = [];

export const getGenders = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getGenders', config).then(
        res => {
            if (res.data.ok) {
                genders = res.data.result
                resolve(true)
            }
        }).catch(
            err => {
                reject(err)
            }
        )
})

export const getGenderList = () => {
    return genders;
}