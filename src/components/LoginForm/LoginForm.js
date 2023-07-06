import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { environment } from "../../environment/Environment"
import userIcon from "../../assets/images/user.svg"
import passwordIcon from "../../assets/images/password.svg"
import hideIcon from "../../assets/images/hide.svg"
import viewIcon from "../../assets/images/view.svg"
import sha256 from 'js-sha256'
import "./LoginForm.css"

const LoginForm = ({ forgotPassword }) => {
    const navigate = useNavigate()

    const [loginUser, setLoginUser] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [invalidAuth, setInvalidAuth] = useState("")
    const [noActiveAuth, setNoActiveAuth] = useState("")
    const [outOfTimeAuth, setOutOfTime] = useState("")
    const [showPasswordState, setPasswordState] = useState(false);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setInvalidAuth(false)
        const user = {
            email: loginUser,
            password: sha256(loginPassword),
            date: new Date()
        };

        axios.post(environment.APIHost + '/login', user).then(res => {
            if (res.data.ok) {
                if (res.data.message.active_state) {
                    setInvalidAuth(false)
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('id_system_user', res.data.message.id_system_user)
                    sessionStorage.setItem('names_user', res.data.message.names_user)
                    sessionStorage.setItem('last_access_date', res.data.message.last_access_date)
                    sessionStorage.setItem('last_access_ip_address', res.data.message.last_access_ip_address)
                    sessionStorage.setItem('personal_email_user', res.data.message.personal_email_user)
                    sessionStorage.setItem('phone_number_user', res.data.message.phone_number_user)

                    sessionStorage.setItem('id_role', res.data.message.id_role)
                    const id_role = res.data.message.id_role;
                    switch (id_role) {
                        case 1:
                            navigate('/manager')
                            break;
                        case 2:
                            navigate('/secretary')
                            break;
                        case 3:
                            navigate('/flume')
                            break;
                        case 4:
                            navigate('/admin')
                            break;
                        default:
                            setNoActiveAuth(true)
                            break;
                    }
                } else {
                    setNoActiveAuth(true)
                }
            } else {
                if (res.data.error === "Out of time") {
                    setOutOfTime(true);
                } else {
                    setInvalidAuth(true)
                }

            }
        }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="login-form">
            <p className="login-title"><b>Inicar sesión</b></p>
            {
                (invalidAuth &&
                    <p className="auth-error-message">¡¡Usuario o contraseña incorrecta!!</p>) ||
                (
                    noActiveAuth &&
                    <p className="no-active-error-message">¡¡Usuario no activo en el sistema!!</p>) ||
                (outOfTimeAuth &&
                    <p className="out-of-time-error-message">¡¡No tienes permiso para acceder fuera del horario permitido!!</p>)
            }
            <div className="input-login">
                <img src={userIcon} width={30} alt=""></img>
                <input type="text" placeholder="Usuario" className="input-user" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} />
            </div>
            <div className="input-login">
                <img src={passwordIcon} width={30} alt=""></img>
                <input type={showPasswordState ? "text" : "password"} placeholder="Contraseña" className="input-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <button className="show-hide-button" onClick={() => setPasswordState(!showPasswordState)}>
                    <img src={showPasswordState ? hideIcon : viewIcon} width={30} alt=""></img>
                </button>
            </div>
            <button className="button-login" onClick={handleSubmitLogin}><b>Ingresar</b></button>
            <a onClick={forgotPassword}>Olvidé Mi Contraseña</a>
        </div>
    )
}


export default LoginForm