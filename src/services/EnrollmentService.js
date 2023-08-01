import axios from "axios";
import { environment } from "../environment/Environment";

let enrollment = {};
let enrollmentStates = [];
let enrollmentId = 0;

export const getEnrollmentByID = (idEnrollment) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getEnrollment/' + idEnrollment, config).then((res) => {
        if (res.data.ok) {
            enrollment = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getEnrollment = () => {
    return enrollment;
}

export const addEnrollment = (newEnrollment) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost + '/addEnrollment', newEnrollment, config).then(res => {
        if (res.data.ok) {
            enrollmentId = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch(err => {
        reject(err)
    })
})

export const getEnrollmentID = () => {
    return enrollmentId;
}

export const getEnrollmentStates = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getEnrollmentStates', config).then((res) => {
        if (res.data.ok) {
            enrollmentStates = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch((err) => {
        reject(err)
    })
})

export const getEnrollmentStatesList = () => {
    return enrollmentStates;
}

export const editEnrollment = (enrollmentEdited) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }

    axios.post(environment.APIHost + '/updateEnrollment', enrollmentEdited, config).then((result) => {
        if (result.data.ok) {
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch((err) => {
        reject(err)
    })
})