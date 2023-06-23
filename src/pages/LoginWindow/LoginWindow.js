import React, {useState} from "react";
import AqueductLogo from '../../components/AqueductLogo/AqueductLogo';
import LoginForm from '../../components/LoginForm/LoginForm'
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword'
import "./LoginWindow.css"

const Loginwindow =() =>{
    const[modalStateVerifyIdentity, changeModalStateVerifyIdentity] = useState(false);
    const[modalStateCode, changeModalStateCode] = useState(false);
    const[modalsStateChangePassword, changeModalStateChangePassword] = useState(false);

    return(
        <div classname = 'Login'>
        <AqueductLogo/>
        <LoginForm forgotPassword={() => changeModalStateVerifyIdentity(true)}/>
        <ModalForgotPassword
            state={modalStateVerifyIdentity}
            closeFunction={() => changeModalStateVerifyIdentity(false)}
            title= {<p className="modal-title">Necesitamos Verificar Tu Identidad</p>}
            content ={
                <div>
                    <p className="modal-text">Enviaremos un Código de Seguridad al Correo</p>
                    <p className="modal-text">{LoginForm.getEmail()}</p>
                </div>
            }
            acceptFunction={() => {
                // Aqui va el axios para enviar el codigo
                changeModalStateVerifyIdentity(false);
                changeModalStateCode(true);
            }}
        />
        <ModalForgotPassword
        state={modalStateCode}
        closeFunction={() => changeModalStateCode(false)}
        title={<p className="modal-title">Ingresa el Código de seguridad<br/>que te hemos enviado</p>}
        content={
            <input type="number" className="modal-input-code"/>}
        acceptFunction={ () => {
            changeModalStateCode(false);
            //aqui va el axios.post y un condicional si coincide el código
            changeModalStateChangePassword(true);
        }}
        />
        <ModalForgotPassword
        state={modalsStateChangePassword}
        closeFunction={() => changeModalStateChangePassword(false)}
        title={<p className="modal-title"> Cambiar Contraseña</p>}
        content={
            <div>
                <div>
                    <p className="modal-text">Nueva Contraseña</p>
                    <input type="password" className="modal-input-password"/>
                </div>
                <div>
                    <p className="modal-text">Confirmar contraseña</p>
                    <input type= "password" className="modal-input-password"></input>
                </div>
            </div>
        }
        acceptFunction={() =>{
            //aqui va la validacion y el post con axios para actualizar clave
            changeModalStateChangePassword(false);
        }}
        />
        </div>
    )
}
export default Loginwindow