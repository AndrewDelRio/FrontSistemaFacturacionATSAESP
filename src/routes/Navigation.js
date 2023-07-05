import React from 'react'
import { Routes, Route } from "react-router-dom";
import LoginWindow from "../pages/LoginWindow/LoginWindow";
import MainwindowSecretary from "../pages/MainWindowSecretary/MainWindowSecretary";
import MainWindowManager from "../pages/MainWindowManager/MainWindowManager";
import SettingsWindows from "../pages/SettingsWindows/SettingsWindows";

export const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginWindow />} />
            <Route path="/secretary/*" element={<MainwindowSecretary />} />
            <Route path="/manager/*" element={<MainWindowManager />} />
            <Route path="/setting/*" element={<SettingsWindows />} />
        </Routes>
    )
}