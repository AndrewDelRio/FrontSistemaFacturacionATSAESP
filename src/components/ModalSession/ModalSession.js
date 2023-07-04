import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ReactComponent as ExitIcon } from "../../assets/images/ExitIcon.svg"
import { ReactComponent as SettingsIcon } from "../../assets/images/SettingsIcon.svg"
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
        navigate('/')
    }

    const handleClickSettings = () => {
        navigate('/settings/personal-dates')
    }

    return (
        <>
            {state &&
                <Overlay onClick={closeFunction}>
                    <div>
                        <button onClick={handleClickExit}>
                            <ExitIcon width={30} height={30} fill={defaultIconsColor} />
                            <p>Cerrar sesión</p>
                        </button>
                        <button onClick={handleClickSettings}>
                            <SettingsIcon width={30} height={30} fill={defaultIconsColor} />
                            <p>Gestionar cuenta</p>
                        </button>
                    </div>
                </Overlay>
            }
        </>
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
`;
