import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import enrollmentIcon from "../../../assets/images/property.svg"
import searchIcon from "../../../assets/images/search.svg"
import warningIcon from "../../../assets/images/warning.svg"
import addEnrollmentIcon from "../../../assets/images/addEnrollment.svg"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getEnrollmentByID } from "../../../services/EnrollmentService"
import { getAllSubscribers } from "../../../services/SubscriberService"
import { getAllProperties } from "../../../services/PropertiesService"
import { getAllUsesPublicServices } from "../../../services/UsePublicService"
import { getAllFinancings } from "../../../services/FinancingService"
import { getAllServicesPublic } from "../../../services/DomesticPublicServices"
import './EnrollmentsWindow.css'
const defaultIconsColor = "#FFFFFF"

const EnrollmentsWindows = () => {
    const navigate = useNavigate()

    const [idEnrollment, setIdEnrollment] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchEnrollment = (e) => {
        e.preventDefault();
        if (idEnrollment) {
            getEnrollmentByID(idEnrollment).then(res => {
                if (res) {
                    navigate('/secretary/enrollment/' + idEnrollment)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const onEnterKeySearchEnrollment = (e) => {
        if (e.keyCode === 13) {
            handleClickSearchEnrollment(e)
        }
    }

    const handleClickAddEnrollment = () => {
        getAllSubscribers().then(res => {
            if (res) {
                getAllProperties().then(resProperties => {
                    if (resProperties) {
                        getAllUsesPublicServices().then(resUsesPublicService => {
                            if (resUsesPublicService) {
                                getAllFinancings().then(resFinancings => {
                                    if (resFinancings) {
                                        getAllServicesPublic().then(resServicesPublic => {
                                            if (resServicesPublic) {
                                                navigate('/secretary/register-enrollment')
                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }
    return (
        <div className='enrollments'>
            <img alt='' src={enrollmentIcon} height={100} className='enrollments-icon'></img>
            <p className='enrollments-title'><b>Matrículas</b></p>
            <div className='form-search-enrollment'>
                <div className='search-enrollment'>
                    <input type='number' placeholder='Nº de matrícula' className='input-id-enrollment' value={idEnrollment} onChange={(e => setIdEnrollment(e.target.value))} onKeyDown={(e) => onEnterKeySearchEnrollment(e)} />
                    <button onClick={handleClickSearchEnrollment} className='button-search-enrollments'>
                        <img src={searchIcon} alt='' width={40} height={40} fill={defaultIconsColor}></img>
                    </button>
                </div>
                <button onClick={handleClickAddEnrollment} className='button-register-enrollment'>
                    <img src={addEnrollmentIcon} alt='' width={40} height={40} fill={defaultIconsColor} className='add-enrollment-icon-button'></img>
                    <p>Registrar matrícula</p>
                </button>
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"El número de matrícula ingresado no arrojó ningun resultado"}
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}

export default EnrollmentsWindows
