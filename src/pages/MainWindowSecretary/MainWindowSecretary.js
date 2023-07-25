import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBarSecretary from "../../components/MainNavBarSecretary/MainNavBarSecretary";
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../Subscribers/SubscribersWindow/SubscribersWindow"
import { SubscriberWindow } from "../Subscribers/SubscriberWindow/SubscriberWindow";
import { AddSubscriberWindow } from "../Subscribers/AddSubscriberWindow/AddSubscriberWindow";
import { EditSubscriberWindow } from "../Subscribers/EditSubscriberWindow/EditSubscriberWindow";
import { PropertiesWindows } from "../Properties/PropertiesWindows/PropertiesWindows";
import { PropertyWindow } from "../Properties/PropertyWindow/PropertyWindow";
import { AddPropertyWindow } from "../Properties/AddPropertyWindow/AddPropertyWindow"
import { EditPropertyWindow } from "../Properties/EditPropertyWindow/EditPropertyWindow"
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
                <Route path="property/:idProperty" element={<PropertyWindow />}></Route>
                <Route path="register-property" element={<AddPropertyWindow />}></Route>
                <Route path="edit-property/:id_property_number" element={<EditPropertyWindow />}></Route>
            </Routes>
        </div>
    )
}

export default MainWindowSecretary
