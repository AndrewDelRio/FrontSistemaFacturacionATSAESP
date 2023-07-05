import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import "./ChangePasswordWindow.css"

export default function ChangePasswordWindow() {
    const navigate = useNavigate()

    const handleClickAdmin = () => {
        navigate('/admin')
    }

    return (
        <div className="change-password-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickAdmin} className="button-back" />
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
        </div>
    )
}