import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addSubscriberIcon from "../../assets/images/addSubscriber.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalMessagePerformed } from "../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getDocumentTypeValues } from "../../services/DocumentTypeService";
import { getGenderList } from "../../services/GenderService";
import { addSubscriber } from "../../services/SubscriberService";
import { validateEmail, validateNames } from "../../validations/ValidateForms";
import ControlButton from "../../components/ControlButton/ControlButton";
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import "./AddSubscriberWindow.css";

let documentTypes = [];
let genders = []

export function AddSubscriberWindow() {

    documentTypes = getDocumentTypeValues();
    genders = getGenderList();
    console.log(genders);

    const [modalState, changeModalState] = useState(false);
    const [modalWarningState, changeModalWarningState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [modalExistState, changeModalExistState] = useState(false);
    const [modalDocumentErrorState, changeModalDocumentErrorState] = useState(false);
    const [modalDocumentExpeditionDateErrorState, changeModalDocumentExpeditionDateErrorState] = useState(false);
    const [modalBirthdateErrorState, changeModalBirthdateErrorState] = useState(false);
    const [modalLastnamesErrorState, changeModalLastnamesErrorState] = useState(false);
    const [modalNamesErrorState, changeModalNamesErrorState] = useState(false);
    const [modalAddressErrorState, changeModalAddressErrorState] = useState(false);
    const [modalEmailAddressErrorState, changeModalEmailAddressErrorState] = useState(false);
    const [modalPhoneNumberErrorState, changeModalPhoneNumberErrorState] = useState(false);
    const [modalStateBack, changeModalbackToPage] = useState(false);

    const [documentTypeState, setDocumentTypeState] = useState(documentTypes.length > 0 ? documentTypes[0].id_document_type : '')
    const [gendersState, setGendersState] = useState(genders.length > 0 ? genders[0] : '')
    const [documentNumberState, setDocumentNumberState] = useState("")
    const [nameState, setNamesState] = useState("")
    const [lastnamesState, setLastnamesState] = useState("")
    const [expeditionDateState, setExpeditionDateState] = useState("")
    const [birthdayState, setBirthdayState] = useState("")
    const [addressState, setAddressState] = useState("")
    const [emailState, setEmailState] = useState("")
    const [phoneState, setPhoneState] = useState("")


    const navigate = useNavigate()

    const handleClickAddSubscriber = (e) => {
        e.preventDefault();
        const timestamp1 = Date.parse(birthdayState);
        const timestamp2 = Date.parse(expeditionDateState);
        if (timestamp1 === timestamp2) {
            changeModalBirthdateErrorState(!modalBirthdateErrorState);
        } else if (timestamp1 >= timestamp2) {
            changeModalDocumentExpeditionDateErrorState(!modalDocumentExpeditionDateErrorState);
        }
        else if (documentNumberState === "" ||
            nameState === "" ||
            lastnamesState === "" ||
            addressState === "" ||
            documentTypeState === "" ||
            expeditionDateState === "" ||
            birthdayState === "") {
            changeModalWarningState(!modalWarningState)
        } else if (documentNumberState < 1 || documentNumberState > 9999999999) {
            changeModalDocumentErrorState(!modalDocumentErrorState)
        } else if (!validateNames(nameState) || nameState.length > 50) {
            changeModalNamesErrorState(!modalNamesErrorState)
        } else if (!validateNames(lastnamesState) || lastnamesState.length > 50) {
            changeModalLastnamesErrorState(!modalLastnamesErrorState)
        } else if ((!validateEmail(emailState) || emailState.length > 100) && emailState !== '') {
            changeModalEmailAddressErrorState(!modalEmailAddressErrorState)
        } else if ((phoneState < 3000000000 || phoneState >= 4000000000) && phoneState !== '') {
            changeModalPhoneNumberErrorState(!modalPhoneNumberErrorState)
        }
        else if (documentNumberState !== "" && nameState !== "" && lastnamesState !== "" && addressState !== "" && documentTypeState !== "") {
            const newSubscriber = {
                id_subscriber: documentNumberState === "" ? null : documentNumberState,
                document_expedition_date: expeditionDateState === "" ? null : expeditionDateState,
                birthdate_subscriber: birthdayState === "" ? null : birthdayState,
                lastnames_subscriber: lastnamesState === "" ? null : lastnamesState,
                names_subscriber: nameState === "" ? null : nameState,
                place_expedition_document: "",
                gender_subscriber: gendersState === "" ? null : gendersState,
                address_subscriber: addressState === "" ? null : addressState,
                email_subscriber: emailState === "" ? null : emailState,
                cellphone_subscriber: phoneState === "" ? null : phoneState,
                id_document_type: documentTypeState === "" ? null : documentTypeState
            };
            addSubscriber(newSubscriber).then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                } else {
                    changeModalExistState(!modalExistState)
                }
            }).catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }


    const handleClickBackButton = () => {
        changeModalbackToPage(!modalStateBack);
    }

    const handleClickBackToSubscribers = () => {
        navigate('/secretary/subscribers')
    }

    const handleClickAddSubscribers = (modalState) => {
        changeModalWarningState(!modalState)
    }

    const handleClickAddSubscribersError = () => {
        changeModalErrorState(!modalErrorState)
    }

    const handleClickAddSubscriberExist = () => {
        changeModalExistState(!modalExistState)
    }



    return (
        <div className="add-subscriber">
            <img src={addSubscriberIcon} alt="" width={100} className="add-subscriber-icon"></img>
            <p>Nuevo suscriptor</p>
            <div className="add-form">
                <div>
                    <p>Tipo de Documento *</p>
                    <select className="input-info-subscriber"
                        value={documentTypeState}
                        onChange={(e) => setDocumentTypeState(e.target.value)}
                    >
                        {documentTypes.map(documentType => {
                            return (
                                <option key={documentType.id_document_type}
                                    value={documentType.id_document_type}>
                                    {documentType.document_type_name + " (" + documentType.document_type_abbreviation + ")"}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div id="expedition-date" >
                    <p>Fecha de expedición del documento *</p>
                    <input className="input-info-subscriber" type="date" value={expeditionDateState} onChange={(e) => setExpeditionDateState(e.target.value)} />
                </div>
                <div>
                    <p>Número de documento *</p>
                    <input className="input-info-subscriber" type="number" value={documentNumberState} onChange={(e) => setDocumentNumberState(e.target.value)} />
                </div>


                <div id="birthdate">
                    <p>Fecha de nacimiento *</p>
                    <input className="input-info-subscriber" type="date" value={birthdayState} onChange={(e) => setBirthdayState(e.target.value)} />
                </div>
                <div>
                    <p>Apellido(s) *</p>
                    <input className="input-info-subscriber" type="text" value={lastnamesState} onChange={(e) => setLastnamesState(e.target.value)}></input>
                </div>
                <div>
                    <p>Nombre(s) *</p>
                    <input className="input-info-subscriber" type="text" value={nameState} onChange={(e) => setNamesState(e.target.value)}></input>
                </div>
                <div>
                    <p>Género *</p>
                    <select className="input-info-subscriber"
                        value={gendersState}
                        onChange={(e) => setGendersState(e.target.value)}
                    >
                        {genders.map(gender => {
                            return (
                                <option key={gender} value={gender}>{gender}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <p>Dirección *</p>
                    <input className="input-info-subscriber" type="text" value={addressState} onChange={(e) => setAddressState(e.target.value)}></input>
                </div>
                <div>
                    <p>Correo electrónico *</p>
                    <input className="input-info-subscriber" type="text" value={emailState} onChange={(e) => setEmailState(e.target.value)}></input>
                </div>
                <div>
                    <p>Teléfono *</p>
                    <input className="input-info-subscriber" type="number" value={phoneState} onChange={(e) => setPhoneState(e.target.value)}></input>
                </div>
            </div>
            <div className="control-button">
                <ControlButton
                    titleAceptButton="Registrar"
                    titleBackButton="Volver"
                    acceptFunction={handleClickAddSubscriber}
                    backFunction={() => { changeModalbackToPage(!modalStateBack) }}
                />
            </div>
            <ModalMessagePerformed
                img={addSubscriberIcon}
                title="Aviso"
                message="Suscriptor registrado exitosamente en el sistema"
                state={modalState}
                accept={handleClickBackToSubscribers}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={handleClickAddSubscribers}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="Error al agregar el suscriptor"
                state={modalErrorState}
                accept={handleClickAddSubscribersError}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="El suscriptor ya existe en el sistema"
                state={modalExistState}
                accept={handleClickAddSubscriberExist}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="Número de documento invalido"
                state={modalDocumentErrorState}
                accept={() => { changeModalDocumentErrorState(!modalDocumentErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="El campo 'Apellido(s)' es obligatorio"
                state={modalLastnamesErrorState}
                accept={() => { changeModalLastnamesErrorState(!modalLastnamesErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="El campo 'Nombre(s)' es obligatorio"
                state={modalNamesErrorState}
                accept={() => { changeModalNamesErrorState(!modalNamesErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="El campo 'Correo electrónico' es obligatorio"
                state={modalEmailAddressErrorState}
                accept={() => { changeModalEmailAddressErrorState(!modalEmailAddressErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="La fecha de nacimiento es mayor a la fecha de expedición del documento"
                state={modalDocumentExpeditionDateErrorState}
                accept={() => { changeModalDocumentExpeditionDateErrorState(!modalDocumentExpeditionDateErrorState) }}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message="La Fecha de nacimiento es igual a la Fecha de expedición del documento"
                state={modalBirthdateErrorState}
                accept={() => { changeModalBirthdateErrorState(!modalBirthdateErrorState) }}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="El campo 'Dirección' es obligatorio"
                state={modalAddressErrorState}
                accept={() => { changeModalAddressErrorState(!modalAddressErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="El campo 'Teléfono' es obligatorio"
                state={modalPhoneNumberErrorState}
                accept={() => { changeModalPhoneNumberErrorState(!modalPhoneNumberErrorState) }}
            />
            <ModalActionPerformed
                img={warningIcon}
                title={"¿Deseas salir?"}
                message={"¡¡Se perderá toda la información sin guardar!!"}
                state={modalStateBack}
                accept={handleClickBackToSubscribers}
                cancel={handleClickBackButton}
            />
        </div>
    )

}