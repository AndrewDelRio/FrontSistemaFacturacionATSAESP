import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBarSecretary from "../../components/MainNavBarSecretary/MainNavBarSecretary";
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../Subscribers/SubscribersWindow/SubscribersWindow"
import { SubscriberWindow } from "../Subscribers/SubscriberWindow/SubscriberWindow";
import { AddSubscriberWindow } from "../Subscribers/AddSubscriberWindow/AddSubscriberWindow";
import { EditSubscriberWindow } from "../Subscribers/EditSubscriberWindow/EditSubscriberWindow";
import { PropertiesWindows } from "../Properties/PropertiesWindows/PopertiesWindows";
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
                <Route path="edit-subscriber/:id_subscriber" element={<EditSubscriberWindow />} />
                <Route path="properties" element={<PropertiesWindows />}></Route>
            </Routes>
        </div>
    )
}

export default MainWindowSecretary
