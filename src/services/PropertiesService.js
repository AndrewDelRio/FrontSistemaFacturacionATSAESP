import axios from "axios";
import { environment } from "../environment/Environment"

let property = {}

export const getPropertyByID = (idProperty) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.get(environment.APIHost + '/getProperty/' + idProperty, config).then(res => {
        if (res.data.ok) {
            property = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getProperty = () => {
    return property;
} 