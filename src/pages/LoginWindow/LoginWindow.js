import React, {useState} from "react";
import AqueductLogo from '../../components/AqueductLogo/AqueductLogo';
import LoginForm from "../../components/LoginForm/LoginForm"
import "./LoginWindow.css"

const Loginwindow =() =>{
    return(
        <div classname = 'Login'>
        <AqueductLogo/>
        <LoginForm/>
        </div>
    )
}
export default Loginwindow