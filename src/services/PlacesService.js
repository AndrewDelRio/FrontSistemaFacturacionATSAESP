import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];
let municipalities = [];
let sectors = [];
let comunes = [];
let neighboorhods = [];
let blocksOrSideWalks = [];

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
export const getMunicipalitiesOfAPlace = (id_place) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/MNP', config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            municipalities = resultPlaces.data.result;
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
    return municipalities;
}

/**
 * Obtain the places associated to a place(municipalities, sectors, communes, neighboorhods, blocks or sidewalks) of the coverage area of the company
 * @param {*} id_place 
 * @param {*} type_place 
 * @returns 
 */
export const getSectorsOfAPlace = (id_place) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/SEC', config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            sectors = resultPlaces.data.result;
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
export const getSectorsList = () => {
    return sectors;
}

/**
 * Obtain the places associated to a place(municipalities, sectors, communes, neighboorhods, blocks or sidewalks) of the coverage area of the company
 * @param {*} id_place 
 * @param {*} type_place 
 * @returns 
 */
export const getComunesOfAPlace = (id_place) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/COM', config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            comunes = resultPlaces.data.result;
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
export const getComunesList = () => {
    return comunes;
}

/**
 * Obtain the places associated to a place(municipalities, sectors, communes, neighboorhods, blocks or sidewalks) of the coverage area of the company
 * @param {*} id_place 
 * @param {*} type_place 
 * @returns 
 */
export const getNeighboorhodsOfAPlace = (id_place) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/BAR', config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            neighboorhods = resultPlaces.data.result;
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
export const getNeighboorhodsList = () => {
    return neighboorhods;
}

/**
 * Obtain the places associated to a place(municipalities, sectors, communes, neighboorhods, blocks or sidewalks) of the coverage area of the company
 * @param {*} id_place 
 * @param {*} type_place 
 * @returns 
 */
export const getBlocksOrSidewalkOfAPlace = (id_place, property_type) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    let abbreviationPropertyType = '';
    if (property_type === '00') {
        abbreviationPropertyType = 'VER';
    } else if (property_type === '01') {
        abbreviationPropertyType = 'MZN'
    } else {
        abbreviationPropertyType = 'OTC'
    }
    axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place + '/' + abbreviationPropertyType, config).then(resultPlaces => {
        if (resultPlaces.data.ok) {
            blocksOrSideWalks = resultPlaces.data.result;
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
export const getBlocksOrSideWalksList = () => {
    return blocksOrSideWalks;
}