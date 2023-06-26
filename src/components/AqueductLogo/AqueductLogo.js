import React from "react";
import logoApp from "../../assets/images/Logo.png"
import "./AqueductLogo.css"
//import {ExternalLink} from 'react-external-link'

const AqueductLogo = () =>{
    return (
        <div className="Aqueduct-logo">
            <div className="Aqueduct-logo-circle">
                <img src={logoApp} width={150} alt = ""></img>
            </div>
            <div className="Aqueduct-name">
                <p><b>Sistema de Facturación<br></br><br></br>Empresa de Servicios Públicos de Togüí(Boyacá)<br></br> "AGUAS DE TOGÜÍ S.A. E.S.P"</b></p>
            </div>
            <div className = "Aqueduct-oficial-page">
                <a ExternalLink href="http://www.espaguasdetogui-boyaca.gov.co/" target="_blank" rel="noopener noreferrer">Empresa de Servicios Publicos de Togüí - Página Oficial</a>
            </div>
        </div>
    )
}

export default AqueductLogo