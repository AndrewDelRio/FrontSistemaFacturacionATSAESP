import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editSubscriberIcon from "../../../assets/images/editSubscriber.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../../components/ModalActionPerformed/ModalActionPerformed"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import ControlButton from "../../../components/ControlButton/ControlButton"
import { editSubscriber, getSubscriber, getSubscriberByID } from "../../../services/SubscriberService"
import { validateEmail } from "../../../validations/ValidateForms"
import "./EditSubscriberWindow.css"

let subscriber = {};

export function EditSubscriberWindow() {

    subscriber = getSubscriber()

    const [addressState, setAddresState] = useState(subscriber.address_subscriber !== null ? subscriber.address_subscriber : '')
    const [emailState, setEmailState] = useState(subscriber.email_subscriber !== null ? subscriber.email_subscriber : '')
    const [phoneNumberState, setPhoneNumberState] = useState(subscriber.cellphone_subscriber !== null ? subscriber.cellphone_subscriber : '')

    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalEmailErrorState, changeModalEmailErrorState] = useState(false)
    const [modalPhoneErrorState, changeModalPhoneErrorState] = useState(false)
    const [modalStateBack, changeModalbackToPage] = useState(false)

    const navigate = useNavigate()

    /**
     * Guardar cambios de los datos del suscriptor
     * @param {} e 
     */
    const handleClickEditSubscriber = (e) => {
        e.preventDefault();
        if (addressState === "") {
            changeModalWarningState(!modalWarningState)
        } else if ((!validateEmail(emailState) || emailState.length > 100) && emailState !== '') {
            changeModalEmailErrorState(!modalEmailErrorState)
        } else if ((phoneNumberState < 3000000000 || phoneNumberState > 4000000000) && phoneNumberState !== '') {
            changeModalPhoneErrorState(!modalPhoneErrorState)
        } else {
            const subscriberEdited = {
                id_subscriber: subscriber.id_subscriber,
                address_subscriber: addressState === "" ? null : addressState,
                email_subscriber: emailState === "" ? null : emailState,
                cellphone_subscriber: phoneNumberState === "" ? null : phoneNumberState
            }
            editSubscriber(subscriberEdited).then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                }
            }).catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    /**
     * Mostrar modal de volver a la pagina anterior sin guardar cambios 
     */
    const handleClickBackButton = () => {
        changeModalbackToPage(!modalStateBack);
    }

    /**
     * Confirmar volver sin guardar cambios
     */
    const handleClickBack = () => {
        navigate('/secretary/subscriber/' + subscriber.id_subscriber)
    }

    /**
     * Volver a la pagina anterior despues de editar los datos de usuario
     */
    const handleClickEditSubscriberSuccesfull = () => {
        changeModalState(!modalState)
        getSubscriberByID(subscriber.id_subscriber).then(res => {
            if (res) {
                navigate('/secretary/subscriber/' + subscriber.id_subscriber)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * Mostrar error al tratar de editar los datos del suscriptor
     */
    const handleClickEditSubscriberError = () => {
        changeModalErrorState(!modalErrorState)
    }

    return (
        <div className='edit-subscriber'>
            <img src={editSubscriberIcon} alt='' height={100} className='edit-subscriber-icon'></img>
            <p>Editar Supscriptor</p>
            <p className='name-subscriber'>
                {`${(subscriber.names_subscriber || 'Nombres')}
                ${(subscriber.lastnames_subscriber || 'Apellidos')}`}
            </p>
            <div className='edit-form'>
                <div>
                    <p>Dirección *</p>
                    <input type='text' className='input-info-edit-subscriber' value={addressState} onChange={(e) => setAddresState(e.target.value)} />
                </div>
                <div>
                    <p>Correo electrónico</p>
                    <input type='text' className='input-info-edit-subscriber' value={emailState} onChange={(e) => setEmailState(e.target.value)}></input>
                </div>
                <div>
                    <p>Teléfono</p>
                    <input type='number' className='input-info-edit-subscriber' value={phoneNumberState} onChange={(e) => setPhoneNumberState(e.target.value)} />
                </div>
            </div>
            <div className="control-button">
                <ControlButton
                    titleAceptButton="Guardar"
                    titleBackButton="Volver"
                    acceptFunction={handleClickEditSubscriber}
                    backFunction={() => { handleClickBackButton(!modalStateBack) }}
                />
            </div>
            <ModalMessagePerformed
                img={editSubscriberIcon}
                title={"Aviso"}
                message={"Los datos han sido actualizados"}
                state={modalState}
                accept={handleClickEditSubscriberSuccesfull}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Algunos datos son obligatorios"}
                state={modalWarningState}
                accept={() => { changeModalWarningState(!modalWarningState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Error al editar los datos"}
                state={modalErrorState}
                accept={handleClickEditSubscriberError}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Correo electrónico inválido"}
                state={modalEmailErrorState}
                accept={() => { changeModalEmailErrorState(!modalEmailErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Número de teléfono invalido"}
                state={modalPhoneErrorState}
                accept={() => { changeModalPhoneErrorState(!modalPhoneErrorState) }}
            />
            <ModalActionPerformed
                img={warningIcon}
                title={"¿Deseas salir?"}
                message={"¡¡Se perderá toda la información sin guardar!!"}
                state={modalStateBack}
                accept={handleClickBack}
                cancel={handleClickBackButton}
            />
        </div>
    )
}