import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addPropertyIcon from "../../../assets/images/addProperty.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../../components/ModalActionPerformed/ModalActionPerformed"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getDepartmentsList, getPlacesAssociatedToAPlace } from '../../../services/PlacesService'
import { getEconomicDestinationList } from "../../../services/EconomicDestinationService"
import { getPropertiesType } from "../../../services/PropertiesTypeService"
import { addProperty } from '../../../services/PropertiesService'
import { getOwnerShipConditionsList } from "../../../services/OwnershipConditionService"
import { getStratumsList } from "../../../services/StratumService"
import ControlButton from "../../../components/ControlButton/ControlButton"
import './AddPropertyWindow.css'

let economicDestinationList = [];
let departmentsList = [];
let municipalityList = [];
let sectorsList = [];
let comunesList = [];
let neighboorhoodList = [];
let blocksList = [];
let sideWalksList = [];
let propertyTypeList = [];
let ownershipConditionList = [];
let stratumsList = [];

export function AddPropertyWindow() {

    economicDestinationList = getEconomicDestinationList()
    departmentsList = getDepartmentsList()
    propertyTypeList = getPropertiesType()
    ownershipConditionList = getOwnerShipConditionsList()
    stratumsList = getStratumsList()

    const navigate = useNavigate()
    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalExistState, changeModalExistState] = useState(false)

    const [modalPropertyNumberErrorState, setModalPropertyNumberErrorState] = useState(false)
    const [modalPropertyNameErrorState, setModalPropertyNameErrorState] = useState(false)
    const [modalPropertyNumberRegistrationErrorState, setModalPropertyNumberRegistrationErrorState] = useState(false)
    const [modalPropertyRouteErrorState, setModalPropertyRouteErrorState] = useState(false)
    const [modalPropertyAddressErrorState, setModalPropertyAddressErrorState] = useState(false)
    const [modalPropertyCodeLocalization, setModalPropertyCodeLocalization] = useState(false)
    const [modalHorizontalProperty, setModalHorizontalProperty] = useState(false)

    const [propertyNumberState, setPropertyNumberState] = useState("")
    const [propertyNameState, setPropertyNameState] = useState("")
    const [propertyNumberRegistrationState, setPropertyNumberRegistration] = useState("")
    const [propertyRouteState, setPropertyRouteState] = useState("")
    const [propertyaddressState, setPropertyAddressState] = useState("")
    const [propertyLocalizationCodeState, setPropertyLocalizationCodeState] = useState("")

    const [propertyEconomicDestinationState, setPropertyEconomicDestinationState] = useState("")
    const [propertyTypeState, setPropertyTypeState] = useState("")
    const [propertyOwnershipConditionState, setPropertyOwnershipConditionState] = useState("")
    const [propertyStratumState, setPropertyStratumState] = useState("")

    const [propertyDepartmentState, setPropertyDepartmentState] = useState("")
    const [propertyMunicipalitystate, setPropertyMunicipalitystate] = useState("")
    const [propertySectorState, setPropertySectorState] = useState("")
    const [propertyComuneState, setPropertyComuneState] = useState("")
    const [propertyNeighboorhoodState, setPropertyNeighboorhoodState] = useState("")
    const [propertyBlockState, setPropertyBlockState] = useState("")
    const [propertySidewalkState, setPropertySidewalkState] = useState("")
    const [propertyHorizontalState, setPropertyHorizontalState] = useState("")


    const handleClickAddProperty = (e) => {
        e.preventDefault();
        if (propertyNumberState === "" ||
            propertyNameState === "" ||
            propertyNumberRegistrationState === "" ||
            propertyRouteState === "" ||
            propertyaddressState === "" ||
            propertyLocalizationCodeState === "" ||
            propertyEconomicDestinationState === "" ||
            propertyTypeState === "" ||
            propertyOwnershipConditionState === "" ||
            propertyStratumState === "" ||
            propertyDepartmentState === "" ||
            propertyMunicipalitystate === "" ||
            propertySectorState === "" ||
            propertyComuneState === "" ||
            propertyNeighboorhoodState === "" ||
            propertyBlockState === "" ||
            propertySidewalkState === "" ||
            propertyHorizontalState === "") {
            changeModalWarningState(!modalWarningState)
        } else {

        }
    }
}
