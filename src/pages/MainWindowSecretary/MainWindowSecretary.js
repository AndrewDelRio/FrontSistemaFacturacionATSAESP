import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBarSecretary from "../../components/MainNavBarSecretary/MainNavBarSecretary";
import Welcome from "../../components/Welcome/Welcome";
import { SubscribersWindows } from "../SubscribersWindow/SubscribersWindow"
import './MainWindowSecretary.css';

const MainWindowSecretary = () => {
    return (
        <div className="main-window">
            <MainNavBarSecretary />
            <Routes>
                <Route path="" element={<Welcome />} />
                <Route path="subscribers" element={<SubscribersWindows />} />
            </Routes>
        </div>
    )
}

export default MainWindowSecretary
