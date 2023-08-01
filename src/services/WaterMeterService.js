import axios from "axios";
import { environment } from "../environment/Environment"

export const addWaterMeter = (newWatermeter) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.post(environment.APIHost + '/addWaterMeter', newWatermeter, config).then((res) => {
        if (res.data.ok) {
            resolve(res)
        } else {
            resolve(false)
        }
    }).catch((err) => {
        reject(err)
    })
})
