import axios from "axios"
import { environment } from "../environment/Environment"

let subscriber = {}

export const getSubscriberByID = (idSubscriber) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.get(environment.APIHost + '/getSubscriber/' + idSubscriber, config).then(
        res => {
            if (res.data.ok) {
                subscriber = res.data.result
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch(err => {
            reject(err)
        })
})

export const getSubscriber = () => {
    return subscriber;
}

export const addSubscriber = (newSubscriber) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost + '/addSubscriber', newSubscriber, config).then(
        res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
})

export const editSubscriber = (subscriberEdited) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost + '/updateSubscriber', subscriberEdited, config).then(
        res => {
            resolve(res)
        }).catch(
            err => {
                reject(err)
            }
        )
})