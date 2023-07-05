import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back.svg";
import userProfileIcon from "../../assets/images/userProfile.svg";
import editIcon from "../../assets/images/edit.svg";
import { ModalEditPersonalData } from "../../components/ModalEditPersonalData/ModalEditPersonalData";
import "./PersonalDataWindow.css";

export default function PersonalDataWindow() {
    const navigate = useNavigate()

    const handleClickAdmin = () => {
        navigate('/settings')
    }

    const handleClickPersonalEmail = () => {
        changeModalStatePersonalEmail(!modalStatePersonalEmail);
    }

    const handleClickPhoneNumber = () => {
        changeModalStatePhone(!modalStatePhoneNumber);
    }

    const [modalStatePersonalEmail, changeModalStatePersonalEmail] = useState(false);
    const [modalStatePhoneNumber, changeModalStatePhone] = useState(false);

    return (
        <div className="personal-data-window">
            <input type="image" alt="" src={backIcon} width={40} onClick={handleClickAdmin} className="button-back" />
            <img src={userProfileIcon} alt="" width={100} className="user-profile-icon"></img>
            <div className="personal-data-container">
                <div>
                    <p>Correo personal</p>
                    <div className="personal-data-edit">
                        <p>correo.personal@email.com</p>
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
                        <p>322 222 2222</p>
                        <input type="image" alt="" src={editIcon} height={25} onClick={() => changeModalStatePhone(!modalStatePhoneNumber)} />
                    </div>
                    <ModalEditPersonalData
                        state={modalStatePhoneNumber}
                        title={"Teléfono de contacto"}
                        inputType="number"
                        acceptFunction={handleClickPhoneNumber}
                    />
                </div>
            </div>
        </div>
    )
}