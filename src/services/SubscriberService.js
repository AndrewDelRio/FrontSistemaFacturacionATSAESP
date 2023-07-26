import axios from "axios"
import { environment } from "../environment/Environment"

let subscriber = []
let subscribersList = []

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

export const getAllSubscribers = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getAllSubscribers', config).then(result => {
        if (result.data.ok) {
            subscribersList = result.data.result;
            resolve(true)
        } else {
            resolve(false)
        }

    }).catch(err => {
        reject(err)
    })
});

export const getSubscribersList = () => {
    return subscribersList;
}