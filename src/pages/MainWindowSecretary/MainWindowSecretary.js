import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBarSecretary from "../../components/MainNavBarSecretary/MainNavBarSecretary";
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../SubscribersWindow/SubscribersWindow"
import { SubscriberWindow } from "../SubscriberWindow/SubscriberWindow";
import { AddSubscriberWindow } from "../AddSubscriberWindow/AddSubscriberWindow"
import './MainWindowSecretary.css';

const MainWindowSecretary = () => {
    return (
        <div className="main-window">
            <MainNavBarSecretary />
            <Routes>
                <Route path="" element={<Welcome />} />
                <Route path="subscribers" element={<SubscribersWindow />} />
                <Route path="subscriber/:idSubscriber" element={<SubscriberWindow />} />
                <Route path="register-subscriber" element={<AddSubscriberWindow />} />
            </Routes>
        </div>
    )
}

export default MainWindowSecretary
