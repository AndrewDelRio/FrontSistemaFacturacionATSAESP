import React from "react"
import LogoApp from "../../assets/images/Logo.png"
import "./Welcome.css"

const Welcome = () => {
    return (
        <div className="welcome-panel">
            <p className="welcome"><b>Bienvenido(a)</b></p>
            <img alt="" src={LogoApp} width={180}></img>
            <p className="aqueduct-name"><b>Sistema de facturación<br></br>Empresa de Servicios Públicos de Togüí<br></br>"Aguas de Togüí S.A. E.S.P."</b></p>
        </div>
    )
}
export default Welcome