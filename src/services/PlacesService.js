import axios from "axios";
import { environment } from "../environment/Environment";

let departments = [];
let places = [];

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

export const getPlacesAssociatedToAPlace = (id_place) => {

    new Promise((resolve, reject) => {
        const config = {
            headers: {
                token: sessionStorage.getItem('token')
            }
        }
        axios.get(environment.APIHost + '/getPlacesAssociatedToAPlace/' + id_place, config).then(
            res => {
                if (res.data.ok) {
                    places = res.data.result
                    resolve(true)
                }
            }).catch(
                err => {
                    reject(err)
                }
            )
    })
}

export const getPlacesAssociatedToAPlaceList = (id_place) => {
    getPlacesAssociatedToAPlace(id_place);
    return places;
}