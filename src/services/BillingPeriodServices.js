import axios from "axios";
import { environment } from "../environment/Environment";
let period, projected_period = {}

export const getBillingPeriodID = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getLastBillingPeriodID', config).then((res) => {
        if (res.data.ok) {
            period = res.data.result
        }
        resolve(true)
    }).catch((err) => {
        reject(err)
    })
})

export const getProjectedBillingPeriod = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/projectTheNextBillingPeriod', config).then((res) => {
        if (res.data.ok) {
            projected_period = res.data.result
        }
        resolve(true)
    }).catch((err) => {
        reject(err)
    })
})

export const getPeriod = () => {
    return period;
}

export const getProjectedBillingPeriodInfo = () => {
    return projected_period;
}