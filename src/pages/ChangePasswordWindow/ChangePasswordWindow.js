import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userProfileIcon from "../../assets/images/userProfile.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import ControlButton from "../../components/ControlButton/ControlButton"
import infoIcon from "../../assets/images/warning.svg"
import "./ChangePasswordWindow.css"

export default function ChangePasswordWindow() {
    const navigate = useNavigate()

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

    const handleClickBackButton = () => {
        changeModalbackToPage(!modalStateBack);
    }

    const acceptSaveInformation = () => {

    }

    const [modalStateBack, changeModalbackToPage] = useState(false);

    return (
        <div className="change-password-window">
            <img alt="" src={userProfileIcon} width={100} className="user-profile-icon" />
            <p>Cambiar contraseña</p>
            <div className="change-password-container">
                <div>
                    <p>Contraseña actual</p>
                    <input type="password" />
                </div>
                <div>
                    <p>Nueva contraseña</p>
                    <input type="password" />
                </div>
                <div>
                    <p>Confirmar contraseña</p>
                    <input type="password" />
                </div>
            </div>
            <div className="control-button">
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
    )
}