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
import EnrollmentsWindows from "../Enrollments/EnrollmentsWindow/EnrollmentsWindow"
import { EnrollmentWindow } from "../Enrollments/EnrollmentWindow/EnrollmentWindow"
import { AddEnrollmentWindow } from "../Enrollments/AddEnrollmentWindow/AddEnrollmentWindow"
import { EditEnrollmentWindow } from "../Enrollments/EditEnrollmentWindow/EditEnrollmentWindow";
import { BillingWindow } from "../Billings/BillingWindows/BillingWindow";
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
                <Route path="enrollments" element={<EnrollmentsWindows />}></Route>
                <Route path="enrollment/:idEnrollment" element={<EnrollmentWindow />}></Route>
                <Route path="register-enrollment" element={<AddEnrollmentWindow />}></Route>
                <Route path="edit-enrollment/:id_enrollment" element={<EditEnrollmentWindow />}></Route>
                <Route path="billing" element={<BillingWindow />}></Route>
            </Routes>
        </div>
    )
}

export default MainWindowSecretary
