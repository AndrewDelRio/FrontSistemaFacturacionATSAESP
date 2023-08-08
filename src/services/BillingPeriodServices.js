import axios from "axios";
import { environment } from "../environment/Environment";
let period, projected_period = {}
let actualPeriod, projected_period_structured_date = ""

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
            projected_period_structured_date = res.data.result[0].projected_date
        }
        resolve(true)
    }).catch((err) => {
        reject(err)
    })
})

export const getBillingPeriodStructuredDate = (id_period) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getStructuredDateFromAPeriod/' + id_period, config).then((res) => {
        if (res.data.ok) {
            actualPeriod = res.data.result.structured_date
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
export const getProjectedBillingPeriodNameStructured = () => {
    return projected_period_structured_date
}
export const getBillingPeriodStructuredDateInfo = () => {
    return actualPeriod;
}