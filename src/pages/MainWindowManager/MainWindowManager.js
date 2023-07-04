import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBarManager from "../../components/MainNavBarManager/MainNavBarManager";
import Welcome from "../../components/Welcome/Welcome";
import './MainWindowManager.css';

const MainWindowManager = () => {
    return (
        <div className="main-window">
            <MainNavBarManager />
            <Routes>
                <Route path="" element={<Welcome />} />
            </Routes>
        </div>
    )
}

export default MainWindowManager
