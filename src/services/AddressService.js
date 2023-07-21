import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];
let places = [];

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

export const getDepartmentsLists = () => {
    return departments;
}

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

export const getMunicipalitiesList = () => {
    return places;
}
