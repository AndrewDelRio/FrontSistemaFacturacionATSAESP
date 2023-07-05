import React from "react";
import { Route, Routes } from "react-router-dom";
import SettingsNavBar from "../../components/SettingNavBar/SettingNavBar";
import ChangePasswordWindow from "../ChangePasswordWindow/ChangePasswordWindow";
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow";
import PersonalDataWindow from "../PersonalDataWindow/PersonalDataWindow";
import "./SettingWindows.css"

export default function SettingsWindows() {
    return (
        <div className="settings-window">
            <SettingsNavBar />
            <Routes>
                <Route path="personal-dates" element={<PersonalDataWindow />} />
                <Route path="password" element={<ChangePasswordWindow />} />
                <Route path="*" element={<NotFoundWindow />} />
            </Routes>
        </div>
    )
}
