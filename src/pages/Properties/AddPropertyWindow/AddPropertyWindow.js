import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addPropertyIcon from "../../../assets/images/addProperty.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../../components/ModalActionPerformed/ModalActionPerformed"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getDepartmentsLists } from '../../../services/AddressService'
import { getEconomicDestinationList } from "../../../services/EconomicDestinationService"
import { getPropertiesTypeList } from "../../../services/PropertiesTypeService"
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
let predialCodeComplete = '000000000000000000000000000000'

export function AddPropertyWindow() {

    economicDestinationList = getEconomicDestinationList()
    departmentsList = getDepartmentsLists()
    propertyTypeList = getPropertiesTypeList()
    ownershipConditionList = getOwnerShipConditionsList()
    stratumsList = getStratumsList()


    const navigate = useNavigate()
    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalExistState, changeModalExistState] = useState(false)
    const [modalStateBack, changeModalBackToPage] = useState(false)

    const [modalPropertyNumberErrorState, changeModalPropertyNumberErrorState] = useState(false)
    const [modalPropertyNameErrorState, changeModalPropertyNameErrorState] = useState(false)
    const [modalPropertyNumberRegistrationErrorState, changeModalPropertyNumberRegistrationErrorState] = useState(false)
    const [modalPropertyRouteErrorState, changeModalPropertyRouteErrorState] = useState(false)
    const [modalPropertyCodeLocalization, changeModalPropertyCodeLocalization] = useState(false)
    const [modalHorizontalProperty, changeModalHorizontalProperty] = useState(false)

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
    const [propertyBlockStateOrSidewalk, setPropertyBlockState] = useState("")
    const [propertyHorizontalState, setPropertyHorizontalState] = useState("")
    const [propertyHorizontalBulidingNumberState, setPropertyHorizontalBulidingNumberState] = useState("")
    const [propertyHorizontalFloorNumberState, setPropertyHorizontalFloorNumberState] = useState("")
    const [propertyHorizontalUnityNumberState, setPropertyHorizontalUnityNumberState] = useState("")

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
            propertyBlockStateOrSidewalk === ""
        ) {
            changeModalWarningState(!modalWarningState)
        } else if (propertyNumberState < 0 || propertyNumberState.length > 4) {
            changeModalPropertyNumberErrorState(!modalPropertyNumberErrorState)
        } else if (propertyNameState.length > 75) {
            changeModalPropertyNameErrorState(!modalPropertyNameErrorState)
        } else if (propertyNumberRegistrationState < 0) {
            changeModalPropertyNumberRegistrationErrorState(!modalPropertyNumberRegistrationErrorState)
        } else if (propertyRouteState < 0) {
            changeModalPropertyRouteErrorState(!modalPropertyRouteErrorState)
        } else if (propertyLocalizationCodeState < 0) {
            changeModalPropertyCodeLocalization(!modalPropertyCodeLocalization)
        } else if (propertyHorizontalState && (propertyHorizontalBulidingNumberState === "" || propertyHorizontalFloorNumberState === "" || propertyHorizontalUnityNumberState === "")) {
            changeModalHorizontalProperty(!modalHorizontalProperty)
        }
        else if (propertyNumberState !== "" ||
            propertyNameState !== "" ||
            propertyNumberRegistrationState !== "" ||
            propertyRouteState !== "" ||
            propertyaddressState !== "" ||
            propertyLocalizationCodeState !== "" ||
            propertyEconomicDestinationState !== "" ||
            propertyTypeState !== "" ||
            propertyOwnershipConditionState !== "" ||
            propertyStratumState !== "" ||
            propertyDepartmentState !== "" ||
            propertyMunicipalitystate !== "" ||
            propertySectorState !== "" ||
            propertyComuneState !== "" ||
            propertyNeighboorhoodState !== "" ||
            propertyBlockStateOrSidewalk !== "") {
            predialCodeComplete = propertyDepartmentState + '' + propertyMunicipalitystate + '' + propertyTypeState + '' + propertySectorState + '' + propertyComuneState + '' + propertyNeighboorhoodState + '' + propertyBlockStateOrSidewalk + '' + propertyNumberState + '' + propertyOwnershipConditionState + '' + propertyHorizontalBulidingNumberState + '' + propertyHorizontalFloorNumberState + '' + propertyHorizontalUnityNumberState;
            const newProperty = {
                id_property_number: predialCodeComplete === "" ? null : predialCodeComplete,
                number_property_registration: propertyNumberRegistrationState === "" ? null : propertyNumberRegistrationState,
                route_property: propertyRouteState === "" ? null : propertyRouteState,
                code_localization_property: propertyLocalizationCodeState === "" ? null : propertyLocalizationCodeState,
                address_property: propertyaddressState === "" ? null : propertyaddressState,
                name_property: propertyNameState === "" ? null : propertyNameState,
                destination_economic_property: propertyEconomicDestinationState === "" ? null : propertyEconomicDestinationState,
                id_place: propertyBlockStateOrSidewalk === "" ? null : propertyBlockStateOrSidewalk,
                id_stratum: propertyStratumState === "" ? null : propertyStratumState,
                id_ownership_condition: propertyOwnershipConditionState === "" ? null : propertyOwnershipConditionState,
                id_property_type: propertyTypeState === "" ? null : propertyTypeState
            };
            addProperty(newProperty).then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                } else {
                    changeModalExistState(!modalExistState)
                }
            })
                .catch(err => {
                    console.log(err)
                    changeModalErrorState(!modalErrorState)
                })
        }
    }

    const handleClickProperties = () => {
        navigate('/secretary/properties')
    }

    const handleClickAddProperties = (modalState) => {
        changeModalWarningState(!modalState)
    }

    const handleClickAddSubscribersError = () => {
        changeModalErrorState(!modalErrorState)
    }

    const handleClickAddSubscribersExist = () => {
        changeModalExistState(!modalExistState)
    }
    return (
        <div className='add-property'>
            <img src={addPropertyIcon} alt='' height={50} className='add-enrollment-icon' />
            <p className="new-property-title">Registrar predio</p>
            <div className="add-form-enrollment">
                <p>Datos del predio</p>
                <div className='property-dates-container'>
                    <div>
                        <p>Número del predio *</p>
                        <input type='number' className='input-info-enrollment' placeholder='0000' value={propertyNumberState} onChange={(e) => setPropertyNumberState(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Nombre del predio *</p>
                        <input type='text' placeholder='Nombre' className='input-info-enrollment' value={propertyNameState} onChange={(e) => setPropertyNameState(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Matrícula inmobiliaria *</p>
                        <input type='number' placeholder='000-00000' className='input-info-enrollment' value={propertyNumberRegistrationState} onChange={(e) => setPropertyNumberRegistration(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Ruta del predio *</p>
                        <input type='number' placeholder='00' className='input-info-enrollment' value={propertyRouteState} onChange={(e) => setPropertyRouteState(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Dirección física del predio *</p>
                        <input type='text' placeholder='Dirección' className='input-info-enrollment' value={propertyaddressState} onChange={(e) => setPropertyAddressState(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Código de localización *</p>
                        <input type='number' placeholder='00' className='input-info-enrollment' value={propertyLocalizationCodeState} onChange={(e) => setPropertyLocalizationCodeState(e.target.value)}></input>
                    </div>
                </div>
                <p>Datos económicos del predio</p>
                <div className='property-economic-dates-container'>
                    <div>
                        <p>Destino económico</p>
                        <select className='input-info-enrollment' value={propertyEconomicDestinationState} onChange={(e) => setPropertyEconomicDestinationState(e.target.value)}>{
                            economicDestinationList === null ? '' :
                                economicDestinationList.map(economicDestination => {
                                    return (
                                        <option key={economicDestination} value={economicDestination}>{economicDestination}</option>
                                    )
                                })
                        }

                        </select>
                    </div>
                    <div>
                        <p>Tipo de predio *</p>
                        <select className='input-info-enrollment' value={propertyTypeState} onChange={(e) => setPropertyTypeState(e.target.value)}>{
                            propertyTypeList === null ? '' :
                                propertyTypeList.map(propertyType => {
                                    return (
                                        <option key={propertyType.id_property_type} value={propertyType.id_property_type}>{propertyType.property_type_name}</option>
                                    )
                                })
                        }
                        </select>
                    </div>
                    <div>
                        <p>Condición de propiedad *</p>
                        <select className='input-info-enrollment' value={propertyOwnershipConditionState} onChange={(e) => setPropertyOwnershipConditionState(e.target.value)}>{
                            ownershipConditionList === null ? '' :
                                ownershipConditionList.map(ownership => {
                                    return (
                                        <option key={ownership.id_ownership_condition} value={ownership.id_ownership_condition}>{ownership.name_ownership_condition}</option>
                                    )
                                })
                        }
                        </select>
                    </div>

                    <div>
                        <p>Estrato *</p>
                        <select className='input-info-enrollment' value={propertyStratumState} onChange={(e) => setPropertyStratumState(e.target.value)}>{
                            stratumsList === null ? '' :
                                stratumsList.map(stratum => {
                                    return (
                                        <option key={stratum.id_stratum} value={stratum.id_stratum}>{stratum.name_stratum}</option>
                                    )
                                })
                        }
                        </select>
                    </div>
                </div>
                <p>Dirección del predio</p>
                <div className='property-address-dates-container'>
                    <div>
                        <p>Departamento *</p>
                        <select className='input-info-enrollment' value={propertyDepartmentState} onChange={(e) => setPropertyDepartmentState(e.target.value)}>{
                            departmentsList.map(department => {
                                return (
                                    <option key={department.id_place} value={department.id_place}>{department.name_place}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                </div>
                <div className="control-button">
                    <ControlButton
                        titleAceptButton="Registrar"
                        titleBackButton="Volver"
                        acceptFunction={handleClickAddProperties}
                        backFunction={() => { changeModalBackToPage(!modalStateBack) }}
                    />
                </div>
            </div>

        </div >
    )
}
