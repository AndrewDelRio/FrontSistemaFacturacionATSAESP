import axios from "axios";
import { environment } from "../environment/Environment"

let paymentTypes = []
let paymentList = []

export const getChargeTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getChargeTypes', config).then((res) => {
        if (res.data.ok) {
            //localStorage.setItem('paymentTypes', paymentTypes)
            paymentTypes = res.data.result;
            resolve(true)
        }
    }).catch((err) => {
        reject(err)
    })
})

export const getChargeTypesList = () => {
    return paymentTypes;
}

export const getCharge = (chargeType) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.get(environment.APIHost + '/getChargesByType/' + chargeType, config).then((res) => {
        if (res.data.ok) {
            paymentList = res.data.result;
            resolve(res.data.result)
        } else {
            reject(res)
        }
    }).catch((err) => {
        reject(err)
    })
})

export const getChargeList = () => {
    return paymentList;
}