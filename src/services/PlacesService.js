import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];
let places = [];

/**
 * Obtain the list of deparmets with yours respectives cities
 * @returns 
 */
export const getDepartmets = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getDepartments', config).then(
        res => {
            if (res.data.ok) {
                departments = res.data.result
                resolve(true)
            }
        }).catch(
            err => {
                reject(err)
            }
        )
})

export const getDepartmentsList = () => {
    return departments;
}

/**
 * Obtain the departments of the coverage area of the company
 * @returns 
 */
export const getAddressInformationProperties = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getDepartmentsInfo', config).then(resDepartments => {
        if (resDepartments.data.ok) {
            departments = resDepartments.data.result;
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

/**
 * Export the list of the deprtments
 * @returns 
 */
export const getDepartmentsLists = () => {
    return departments;
}

/**
 * Obtain the places associated to a place(municipalities, sectors, communes, neighboorhods, blocks or sidewalks) of the coverage area of the company
 * @param {*} id_place 
 * @param {*} type_place 
 * @returns 
 */
export const getPlacesAssociatedToAPlace = (id_place, type_place) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/' + type_place, config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            places = resultPlaces.data.result;
            resolve(true)
        }
    }).catch(err => {
        reject(err)
    })
})

/**
 * 
 * @returns Export the list of places associated to the search
 */
export const getMunicipalitiesList = () => {
    return places;
}