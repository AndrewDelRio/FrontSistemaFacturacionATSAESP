import React from 'react'
import { Routes, Route } from "react-router-dom";
import LoginWindow from "../pages/LoginWindow/LoginWindow";
import MainwindowSecretary from "../pages/MainWindowSecretary/MainWindowSecretary";

export const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginWindow />} />
            <Route path="/admin/*" element={<MainwindowSecretary />} />
        </Routes>
    )
}