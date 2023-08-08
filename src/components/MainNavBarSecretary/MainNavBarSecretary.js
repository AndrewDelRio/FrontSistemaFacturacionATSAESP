import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import './MainNavBarSecretary.css';
import logoApp from "../../assets/images/Logo.png"
import SubscriberIcon from "../../assets/images/subscribers.svg"
import PropertyIcon from "../../assets/images/property.svg"
import EnrollmentIcon from "../../assets/images/enrollment.svg"
import InvoiceIcon from "../../assets/images/invoice.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import { ModalSession } from "../ModalSession/ModalSession";
const defaultNavIconsColor = "#FFFFFF"

const MainNavBar = () => {

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="nav-bar">
            <div className="logo-container">

                <div className="nav-bar-image">
                    <img alt="" src={logoApp} width={100}></img>
                </div>

            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/secretary/subscribers" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={SubscriberIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Suscriptores</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/secretary/properties" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={PropertyIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Predios</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/secretary/enrollments" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={EnrollmentIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Matrículas</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/secretary/billing" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={InvoiceIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Facturación</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="access-container">
                <p>Último acceso: {sessionStorage.getItem('last_access_date')}</p>
                <p>Hora del último acceso: {sessionStorage.getItem('last_access_hour')}</p>
                <p>Dirección IP: {sessionStorage.getItem('last_access_ip_address')}</p>
            </div>
            <div className="user-container">
                <ModalSession
                    state={modalState}
                    closeFunction={() => changeModalState(false)}
                />
                <div onClick={() => changeModalState(!modalState)} className="user-profile">
                    <p><b>{sessionStorage.getItem('names_user')}</b></p>
                    <img alt="" src={userProfileIcon} width={40}></img>
                </div>
            </div>
        </div>
    )
}
export default MainNavBar

