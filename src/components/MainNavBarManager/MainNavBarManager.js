import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import './MainNavBarManager.css';
import logoApp from "../../assets/images/Logo.png"
import CollaboratorIcon from "../../assets/images/subscribers.svg"
import RateIcon from "../../assets/images/property.svg"
import RebillingIcon from "../../assets/images/enrollment.svg"
import ReportIcon from "../../assets/images/invoice.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import { ModalSession } from "../ModalSession/ModalSession";
const defaultNavIconsColor = "#FFFFFF"

const MainNavBarManager = () => {

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <NavLink to="/manager">
                    <div className="nav-bar-image">
                        <img alt="" src={logoApp} width={100}></img>
                    </div>
                </NavLink>
            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/manager/collaborators" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={CollaboratorIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Colaboradores</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/rates" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={RateIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Tarifas</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/manager/rebillings" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={RebillingIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Refacturación</b></p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/manager/reports" className={({ isActive }) => (isActive ? "nav-option-active" : "nav-option")}>
                                <img alt="" src={ReportIcon} width={30} height={30} fill={defaultNavIconsColor} className="icon-active" />
                                <p><b>Reportes</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
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
export default MainNavBarManager

