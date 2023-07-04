import { NavLink } from "react-router-dom"
import React, { useState } from "react";
import './MainNavBarSecretary.css';
import logoApp from "../../assets/images/Logo.png"
import { ReactComponent as SubscriberIcon } from "../../assets/images/subscribers.svg"
import { ReactComponent as PropertyIcon } from "../../assets/images/property.svg"
import { ReactComponent as EnrollmentIcon } from "../../assets/images/enrollment.svg"
import { ReactComponent as InvoiceIcon } from "../../assets/images/invoice.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import { ModalSession } from "../ModalSession/ModalSession";
const defaultNavIconsColor = "#FFFFFF"

const MainNavBar = () => {

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <NavLink to="/admin">
                    <div className="nav-bar-image">
                        <img alt="" src={logoApp} width={100}></img>
                    </div>
                </NavLink>
            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/subscribers" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <SubscriberIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Suscriptores</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/properties" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <PropertyIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Predios</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/enrollments" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <EnrollmentIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>matrículas</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/Billings" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <InvoiceIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Facturación</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="user-container">
                <ModalSession
                    state={modalState}
                    closeFunction={changeModalState(false)}
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

