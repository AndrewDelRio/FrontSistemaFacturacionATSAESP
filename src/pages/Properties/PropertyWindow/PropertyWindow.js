import React from 'react'
import { useNavigate } from 'react-router-dom'
import propertyIcon from "../../../assets/images/property.svg"
import viewIcon from "../../../assets/images/view.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { getProperty } from '../../../services/PropertiesService'
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getEnrollmentByID } from '../../../services/EnrollmentService'
import ControlButton from '../../../components/ControlButton/ControlButton'
import './PropertyWindow.css'
import { useState } from 'react'

let property = {};

export function PropertyWindow() {
    property = getProperty()

    const [modalNotFoundState, setModalNotFoundState] = useState("")
    const navigate = useNavigate()

    const handleClickProperties = () => {
        navigate('/secretary/properties')
    }

    const handleClickEditProperty = () => {

    }

    const handleClickEnrollment = (idEnrollment) => {
        if (idEnrollment) {
            getEnrollmentByID(idEnrollment).then(res => {
                console.log(res)
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

    return (
        <div className='property'>
            <img src={propertyIcon} height={50} className='property-icon'></img>
            <p>Consulta del predio</p>
            <div>
                <table className='table-property-info'>
                    <tbody>
                        <tr>
                            <td>Nº predial</td>
                            <td>{property.id_property_number}</td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>{property.name_property}</td>
                        </tr>
                        <tr>
                            <td>Destino económico</td>
                            <td>{property.destination_economic_property}</td>
                        </tr>
                        <tr>
                            <td>Direccion</td>
                            <td>{property.address_property}</td>
                        </tr>
                        <tr>
                            <td>Matrícula inombiliaria</td>
                            <td>{property.number_property_registration}</td>
                        </tr>
                        <tr>
                            <td>Estrato</td>
                            <td>{property.id_stratum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='table-enrollments-property'>
                <p>Matrículas</p>
                <table>
                    <thead>
                        <tr>
                            <th>Nº de matrícula</th>
                            <th>Estado</th>
                            <th>Tipo de servicio</th>
                            <th>Nombre del predio</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {property.listEnrollments ? property.listEnrollments.map((enrollment) => {
                            return (
                                <tr key={enrollment.id_enrollment}>
                                    <td>{enrollment.id_enrollment}</td>
                                    <td>{enrollment.state_enrollment}</td>
                                    <td>{enrollment.name_use_public_service}</td>
                                    <td>{enrollment.name_property}</td>
                                    <td>
                                        <button onClick={() => handleClickEnrollment(enrollment.id_enrollment)} className="show-subscriber-enrollment">
                                            <img alt="" src={viewIcon} height={30}></img>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>}
                    </tbody>
                </table>
            </div>
            <div className="buttons-control">
                <ControlButton
                    titleAceptButton={"Editar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickEditProperty}
                    backFunction={handleClickProperties} />
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Matrícula no encontrada"}
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)} />
        </div>
    )
}