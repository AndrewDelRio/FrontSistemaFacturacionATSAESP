import axios from "axios";
import { environment } from "../environment/Environment";
let billingLastPeriod = []
// let generatedBillings = []

export const getInvoiceLastPeriod = (id_period) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.get(environment.APIHost + '/getInvoiceLastPeriod/' + id_period, config).then((res) => {
        if (res.data.ok) {
            billingLastPeriod = res.data.result
            resolve(true)
        }
    }).catch((err) => {
        reject(err)
    })
})

export const getInvoiceLastPeriodList = () => {
    return billingLastPeriod
}