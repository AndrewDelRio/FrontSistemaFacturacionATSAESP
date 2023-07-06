import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userProfileIcon from "../../assets/images/userProfile.svg";
import editIcon from "../../assets/images/edit.svg";
import { ModalEditPersonalData } from "../../components/ModalEditPersonalData/ModalEditPersonalData";
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import infoIcon from "../../assets/images/warning.svg"
import ControlButton from "../../components/ControlButton/ControlButton"
import "./PersonalDataWindow.css";

export default function PersonalDataWindow() {
    const navigate = useNavigate();


    const backConfirmation = () => {
        const role = sessionStorage.getItem('id_role');
        switch (role) {
            case "1":
                navigate('/manager');
                break;
            case "2":
                navigate('/secretary');
                break;
            case "3":
                navigate('/flume');
                break;
            case "4":
                navigate('/admin');
                break;
            default:
                navigate('*')
                break;
        }
    }

    const handleClickPersonalEmail = () => {
        changeModalStatePersonalEmail(!modalStatePersonalEmail);
    }

    const handleClickPhoneNumber = () => {
        changeModalStatePhone(!modalStatePhoneNumber);
    }

    const handleClickBackButton = () => {
        changeModalbackToPage(!modalStateBack);
    }

    const acceptSaveInformation = () => {

    }

    const [modalStatePersonalEmail, changeModalStatePersonalEmail] = useState(false);
    const [modalStatePhoneNumber, changeModalStatePhone] = useState(false);
    const [modalStateBack, changeModalbackToPage] = useState(false);

    return (
        <div className="personal-data-window">
            <img src={userProfileIcon} alt="" width={100} className="user-profile-icon"></img>
            <div className="personal-data-container">
                <div>
                    <p>Correo personal</p>
                    <div className="personal-data-edit">
                        <p>{sessionStorage.getItem('personal_email_user')}</p>
                        <input type="image" alt="" src={editIcon} height={25} onClick={() => changeModalStatePersonalEmail(!modalStatePersonalEmail)} />
                    </div>
                    <ModalEditPersonalData
                        state={modalStatePersonalEmail}
                        title={"Correo personal"}
                        inputType="text"
                        acceptFunction={handleClickPersonalEmail}
                    />
                </div>
                <div>
                    <p>Teléfono de Contacto</p>
                    <div className="personal-data-edit">
                        <p>{sessionStorage.getItem('phone_number_user')}</p>
                        <input type="image" alt="" src={editIcon} height={25} onClick={() => changeModalStatePhone(!modalStatePhoneNumber)} />
                    </div>
                    <ModalEditPersonalData
                        state={modalStatePhoneNumber}
                        title={"Teléfono de contacto"}
                        inputType="number"
                        acceptFunction={handleClickPhoneNumber}
                    />
                </div>
                <div className="buttons-control">
                    <ControlButton
                        titleAceptButton={"Guardar"}
                        titleBackButton={"Volver"}
                        acceptFunction={() => { acceptSaveInformation() }}
                        backFunction={() => { changeModalbackToPage(!modalStateBack) }}
                    />
                </div>
                <ModalActionPerformed
                    img={infoIcon}
                    title={"¿Deseas salir?"}
                    message={"¡¡Se perderá toda la información sin guardar!!"}
                    state={modalStateBack}
                    accept={backConfirmation}
                    cancel={handleClickBackButton}
                />
            </div>
        </div>
    )
}