import React, {useState} from "react";
import AqueductLogo from '../../components/AqueductLogo/AqueductLogo';
import LoginForm from '../../components/LoginForm/LoginForm'
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword'
import "./LoginWindow.css"

const Loginwindow =() => {
    const[modalStateVerifyIdentity, changeModalStateVerifyIdentity] = useState(false);
    const[modalStateCode, changeModalStateCode] = useState(false);
    const[modalStateChangePassword, changeModalStateChangePassword] = useState(false);

    return(
        <div className='Login'>
            <AqueductLogo/>
            <LoginForm forgotPassword={() => changeModalStateVerifyIdentity(true)}/>
            <ModalForgotPassword
                state={modalStateVerifyIdentity}
                closeFunction={() => changeModalStateVerifyIdentity(false)}
                title={<p className="modal-title">Necesitamos verificar tu identidad</p>}
                content={
                    <div>
                        <p className="modal-text">Ingresa el correo registrado en el sistema</p>
                        <input type="text" placeholder="Correo electronico" className="modal-input-email"/>
                    </div>
                }
                acceptFunction={() => {
                    changeModalStateVerifyIdentity(false);
                    changeModalStateCode(true);
                }}
            />
            <ModalForgotPassword
                state={modalStateCode}
                closeFunction={() => changeModalStateCode(false)}
                title={<p className="modal-title">Ingresa el código de seguridad<br/>que te hemos enviado</p>}
                content={<input type="number" className="modal-input-code"/>}
                acceptFunction={() => {
                    changeModalStateCode(false);
                    changeModalStateChangePassword(true);
                }}
            />
            <ModalForgotPassword
                state={modalStateChangePassword}
                closeFunction={() => changeModalStateChangePassword(false)}
                title={<p className="modal-title">Cambiar contraseña</p>}
                content={
                    <div>
                        <div>
                            <p className="modal-text">Nueva contraseña</p>
                            <input type="password" className="modal-input-password"/>
                        </div>
                        <div>
                            <p className="modal-text">Confirmar contraseña</p>
                            <input type="password" className="modal-input-password"/>
                        </div>
                    </div>
                }
                acceptFunction={() => {
                    changeModalStateChangePassword(false);
                }}
            />
        </div>
    )
}
export default Loginwindow