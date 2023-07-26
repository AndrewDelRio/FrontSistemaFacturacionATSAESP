import React from 'react'
import { useNavigate } from 'react-router-dom'
import ControlButton from "../../../components/ControlButton/ControlButton"
import enrollmentIcon from "../../../assets/images/enrollment.svg"
import { getEnrollment, getEnrollmentStates } from '../../../services/EnrollmentService'
import { getAllUsesPublicServices } from "../../../services/UsePublicService"
import './EnrollmentWindow.css'

let enrollment = {};

export function EnrollmentWindow() {

    enrollment = getEnrollment()

    const navigate = useNavigate()

    const handleClickEnrollments = () => {
        navigate('/secretary/enrollments')
    }

    const handleClickEditEnrollment = () => {
        getEnrollmentStates().then(resEnrollmentStates => {
            if (resEnrollmentStates) {
                getAllUsesPublicServices().then(resUsesService => {
                    if (resUsesService) {
                        navigate('/secretary/edit-enrollment/' + enrollment.id_enrollment)
                    }
                }).catch(errUsesService => {
                    console.log(errUsesService)
                })
            }
        }).catch(errEnrollmentStates => {
            console.log(errEnrollmentStates)
        })
    }

    return (
        <div className='enrollment-window'>
            <img alt='' src={enrollmentIcon} width={50} className='enrollment-icon'></img>
            <p>Matrícula: {('00000' + enrollment.id_enrollment).slice(-5)}</p>
            <div className='table-enrollment-info-container'>
                <table className='table-enrollment-info'>
                    <tbody>
                        <tr>
                            <td>Estado</td>
                            <td>{enrollment.state_enrollment}</td>
                        </tr>
                        <tr>
                            <td>Propietario</td>
                            <td>{enrollment.names_subscriber ? enrollment.names_subscriber : ''}</td>
                        </tr>
                        <tr>
                            <td>Predio</td>
                            <td>{enrollment.name_property ? enrollment.name_property : ''}</td>
                        </tr>
                        <tr>
                            <td>Fecha de adjudicación</td>
                            <td>{enrollment.date_adward ? enrollment.date_adward : ''}</td>
                        </tr>
                        <tr>
                            <td>Tipo de servicio</td>
                            <td>{enrollment.name_use_public_service ? enrollment.name_use_public_service : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='watermeter-info-container'>
                <p>Datos del medidor</p>
                <table className='table-enrollment-info'>
                    <tbody>
                        <tr>
                            <td>Serial del medidor</td>
                            <td>{enrollment.serial_water_meter ? enrollment.serial_water_meter : 'No registra'}</td>
                        </tr>
                        <tr>
                            <td>Marca</td>
                            <td>{enrollment.brand_water_meter ? enrollment.brand_water_meter : 'No registra'}</td>
                        </tr>
                        <tr>
                            <td>Diametro(pulgadas)</td>
                            <td>{enrollment.diameter_water_meter ? enrollment.diameter_water_meter : 'No registra'}</td>
                        </tr>
                        <tr>
                            <td>Calibración</td>
                            <td>{enrollment.calibration_percentage_water_meter ? enrollment.calibration_percentage_water_meter + '%' : 'No registra'}</td>
                        </tr>
                        <tr>
                            <td>Fecha de calibración</td>
                            <td>{enrollment.date_calibration_water_meter !== null ? enrollment.date_calibration_water_meter : 'No registra'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='control-button'>
                <ControlButton
                    titleAceptButton={"Editar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickEditEnrollment}
                    backFunction={handleClickEnrollments}
                />
            </div>
        </div>
    )
}