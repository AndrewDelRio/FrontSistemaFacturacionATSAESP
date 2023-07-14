import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import suscriberIcon from "../../../assets/images/subscriber.svg"
import viewIcon from "../../../assets/images/view.svg"
import warningIcon from "../../../assets/images/warning.svg"
import ControlButton from "../../../components/ControlButton/ControlButton"
import { getSubscriber } from "../../../services/SubscriberService"
import { getEnrollmentByID } from "../../../services/EnrollmentService"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import "./SubscriberWindow.css"

let subscriber = {};

export function SubscriberWindow() {

    subscriber = getSubscriber();

    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const navigate = useNavigate()

    const handleClickSubscribers = () => {
        navigate('/secretary/subscribers')
    }

    const handleClickEditSubscribers = () => {
        navigate('edit-subscriber/' + subscriber.id_subscriber)
    }

    const handleClickEnrollment = (idEnrollment) => {
        if (idEnrollment) {
            getEnrollmentByID(idEnrollment).then(res => {
                if (res) {
                    navigate('/secretary/enrollment' + idEnrollment)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="subscriber">
            <img src={suscriberIcon} alt="" width={100} className="subscriber-icon" />
            <p>
                {
                    `${(subscriber.names_subscriber !== null ? subscriber.names_subscriber : '') || ''}
                    ${(subscriber.lastnames_subscriber !== null ? subscriber.lastnames_subscriber : '') || ''}`
                }
            </p>
            <div>
                <table className="table-personal-info">
                    <tbody>
                        <tr>
                            <td>{subscriber.document_type_abbreviation || 'Documento'}</td>
                            <td>{subscriber.id_subscriber}</td>
                        </tr>
                        <tr>
                            <td>Direccion</td>
                            <td>{subscriber.address_subscriber}</td>
                        </tr>
                        <tr>
                            <td>Fecha de Nacimiento</td>
                            <td>{subscriber.birthdate_subscriber}</td>
                        </tr>
                        <tr>
                            <td>Teléfono</td>
                            <td>{subscriber.cellphone_subscriber}</td>
                        </tr>
                        <tr>
                            <td>Correo electrónico</td>
                            <td>{subscriber.email_subscriber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-enrollments">
                <p>Lista de matrículas</p>
                <table>
                    <thead>
                        <tr>
                            <th>Nº de Matrícula</th>
                            <th>Estado</th>
                            <th>Tipo de Servicio</th>
                            <th>Nombre del predio</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriber.listEnrollments ? subscriber.listEnrollments.map((enrollment) => {
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
                        }) :
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="buttons-control">
                <ControlButton
                    titleAceptButton={"Editar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickEditSubscribers}
                    backFunction={handleClickSubscribers} />
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Matrícula no encontrada"}
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)} />
        </div>
    )
}