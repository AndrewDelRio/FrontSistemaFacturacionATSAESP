import axios from "axios"
import { environment } from "../environment/Environment"

export const addServicePublicToListContracted = (data) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost + '/addServicesPublicContracted', data, config).then(res => {
        if (res.data.ok) {
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        console.log(err)
        reject(err)
    })
})