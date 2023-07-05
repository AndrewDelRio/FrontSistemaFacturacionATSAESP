import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import ExitIcon from "../../assets/images/exit.svg"
import SettingsIcon from "../../assets/images/settings.svg"
import "./ModalSession.css"
const defaultIconsColor = "#000000"

export function ModalSession({ state, closeFunction }) {

    const navigate = useNavigate()

    const handleClickExit = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id_system_user');
        sessionStorage.removeItem('names_user');
        sessionStorage.removeItem('last_access_date');
        sessionStorage.removeItem('last_access_ip_address');
        sessionStorage.removeItem('personal_email_user');
        sessionStorage.removeItem('phone_number_user');
        navigate('/')
    }

    const handleClickSettings = () => {
        navigate('/settings/personal-dates')
    }

    return (
        <div>
            {state &&
                <Overlay onClick={closeFunction}>
                    <div className="modal-session">
                        <button onClick={handleClickExit}>
                            <img src={ExitIcon} alt="" width={30} height={30} fill={defaultIconsColor} />
                            <p>Cerrar sesión</p>
                        </button>
                        <button onClick={handleClickSettings}>
                            <img src={SettingsIcon} alt="" width={30} height={30} fill={defaultIconsColor} />
                            <p>Gestionar cuenta</p>
                        </button>
                    </div>
                </Overlay>
            }
        </div>
    )
}

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    // background: rgba(0,0,0,0.5);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`
