import logoApp from "../../assets/images/Logo.png"
import "./AqueductLogo.css"

const AqueductLogo = () =>{
    return(
        <div className="Aqueduct-logo">
            <div className="Aqueduct-logo-circle">
                <img src={logoApp} width={150}></img>
            </div>
            <div className="Aquedcut-name">
                <p><b> Sistema de Facturación<br></br><br></br>Empresa de Servicios Públicos de Togüí(Boyacá)<br></br>"AGUAS DE TOGÜÍ S.A. E.S.P"</b></p>
            </div>
            <div className="Aqueduct-oficial-page">
            <a target='_blank' rel='noopener noreferrer' href="http://www.espaguasdetogui-boyaca.gov.co/">Empresa de Servicios Públicos de Togüí - Página Oficial</a>
            </div>
        </div>
    )
}
export default AqueductLogo