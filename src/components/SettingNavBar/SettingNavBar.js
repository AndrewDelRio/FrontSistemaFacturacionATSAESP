import { NavLink } from "react-router-dom"
import logoApp from "../../assets/images/Logo.png"
import "./SettingsNavBar.css"
import PersonalDataIcon from "../../assets/images/datosPersonales.png"
import PasswordIcon from "../../assets/images/candado.png"
const defaultNavIconsColor = "#FFFFFF"

export default function SettingsNavBar() {
    return (
        <div className="settings-nav-bar">
            <div className="logo-container">
                <NavLink to="/setting-personal-data">
                    <div className="nav-bar-image">
                        <img alt="" src={logoApp} width={100}></img>
                    </div>
                </NavLink>
            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/setting/personal-dates" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={PersonalDataIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active"></img>
                                <p><b>Datos Personales</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/setting/password" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={PasswordIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active"></img>
                                <p><b>Contraseña</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}