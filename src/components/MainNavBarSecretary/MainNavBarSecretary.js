import styled from "styled-components"
import { NavLink, useParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import './MainNavBarSecretary.css';
import logoApp from "../../assets/images/logoApp.png"
import { ReactComponent as SubscriberIcon } from "../../assets/images/subscriberIcon.svg"
import { ReactComponent as PropertyIcon } from "../../assets/images/PropertyIcon.svg"
import { ReactComponent as EnrollmentIcon } from "../../assets/images/EnrollmentIcon.svg"
import { ReactComponent as InvoiceIcon } from "../../assets/images/InvoiceIcon.svg"
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
                        <img src={logoApp} width={100}></img>
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
                                <EnrollmentIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
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
                    <img src={userProfileIcon} width={40}></img>
                </div>
            </div>
        </div>
    )
}
export default MainNavBar

