import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import editPropertyIcon from '../../../assets/images/editProperty.svg'
import warningIcon from '../../../assets/images/warning.svg'
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { ModalActionPerformed } from "../../../components/ModalActionPerformed/ModalActionPerformed"
import ControlButton from "../../../components/ControlButton/ControlButton"
import { getEconomicDestinationList } from "../../../services/EconomicDestinationService"
import { getStratumsList } from "../../../services/StratumService"
import { getOwnerShipConditionsList } from "../../../services/OwnershipConditionService"
import { getProperty, editProperty, getPropertyByID } from '../../../services/PropertiesService';
import './EditPropertyWindow.css';

let property = [];
let economicDestinationList = [];
let stratumList = [];
let ownershipConditionList = [];

export function EditPropertyWindow() {
    property = getProperty()
    economicDestinationList = getEconomicDestinationList()
    stratumList = getStratumsList();
    ownershipConditionList = getOwnerShipConditionsList();

    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalBackToPage, changeModalBackToPage] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalPropertyNameErrorState, changeModalPropertyNameErrorState] = useState(false)
    const [modalLocalizationCodeErrorState, changeModalLocalizationCodeErrorState] = useState(false)
    const [modalRouteErrorState, changeModalRouteErrorState] = useState(false)

    const [propertyNameState, setPropertyNameState] = useState(property.name_property ? property.name_property : '')
    const [economicDestinationState, setEconomicDestinationState] = useState(property.destination_economic_property ? property.destination_economic_property : '')
    const [localizationCodeState, setLocalizationCodeState] = useState(property.code_localization_property ? property.code_localization_property : 0)
    const [stratumState, setStratumState] = useState(property.id_stratum ? property.id_stratum : 0)
    const [routeState, SetRouteState] = useState(property.route_property ? property.route_property : 0)
    const [ownershipConditionState, setOwnershipConditionState] = useState(property.id_ownership_condition ? property.id_ownership_condition : 0)

    const navigate = useNavigate()

    const handleClickProperty = () => {
        navigate('/secretary/property/' + property.id_property_number)
    }

    const handleClickBackButton = () => {
        changeModalBackToPage(!modalBackToPage)
    }

    const handleClickPropertySuccesfull = () => {
        changeModalState(!modalState)
        getPropertyByID(property.id_property_number).then(res => {
            if (res) {
                navigate('/secretary/property/' + property.id_property_number)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClickEditPropertyError = () => {
        changeModalErrorState(!modalErrorState)
    }

    const handleClickEditProperty = (e) => {
        console.log(property.id_ownership_condition)
        e.preventDefault()
        if (propertyNameState === '' ||
            localizationCodeState === '' ||
            routeState === '') {
            changeModalWarningState(!modalWarningState)
        }
        else if (propertyNameState.length > 50) {
            changeModalPropertyNameErrorState(!modalPropertyNameErrorState)
        } else if (localizationCodeState < 0 || localizationCodeState > 100000) {
            changeModalLocalizationCodeErrorState(!modalLocalizationCodeErrorState)
        } else if (routeState < 0 || routeState > 100000) {
            changeModalRouteErrorState(!modalRouteErrorState)
        } else if (propertyNameState !== '' &&
            localizationCodeState !== '' &&
            routeState !== '') {
            const propertyEdited = {
                id_property_number: property.id_property_number,
                name_property: propertyNameState,
                destination_economic_property: economicDestinationState,
                code_localization_property: localizationCodeState,
                id_stratum: stratumState,
                route_property: routeState,
                id_ownership_condition: ownershipConditionState
            }
            editProperty(propertyEdited).then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                }
            }).catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }
    return (
        <div className='edit-property-window'>
            <img src={editPropertyIcon} alt='' width={50} className='edit-property-icon' />
            <p>Editar datos del predio</p>
            <div className='property-form'>
                <div>
                    <p>Nombre *</p>
                    <input type='text' className='input-info-property' value={propertyNameState} onChange={(e) => setPropertyNameState(e.target.value)} />
                </div>
                <div>
                    <p>Destino económico</p>
                    <select className='input-info-property' value={economicDestinationState} onChange={(e) => setEconomicDestinationState(e.target.value)} onClick={(e) => setEconomicDestinationState(e.target.value)}>
                        {economicDestinationList.length > 0 ?
                            economicDestinationList.map(economicDestination => {
                                return (
                                    <option key={economicDestination} value={economicDestination}>{economicDestination}</option>
                                )
                            }) : ''}
                    </select>
                </div>
                <div>
                    <p>Código de localización *</p>
                    <input type='number' className='input-info-property' value={localizationCodeState} onChange={(e) => setLocalizationCodeState(e.target.value)} />
                </div>

                <div>
                    <p>Estrato</p>
                    <select className='input-info-property' value={stratumState} onChange={(e) => setStratumState(e.target.value)} onClick={(e) => setStratumState(e.target.value)}>
                        {stratumList.length > 0 ?
                            stratumList.map(stratum => {
                                return (
                                    <option key={stratum.number_stratum} value={stratum.number_stratum}>{stratum.name_stratum}</option>
                                )
                            }) : ''}
                    </select>
                </div>
                <div>
                    <p>Ruta del predio *</p>
                    <input type='number' className='input-info-property' value={routeState} onChange={(e) => SetRouteState(e.target.value)} />
                </div>
                <div>
                    <p>Condicion de propiedad</p>
                    <select className='input-info-property' value={ownershipConditionState} onChange={(e) => setOwnershipConditionState(e.target.value)} onClick={(e) => setOwnershipConditionState(e.target.value)}>
                        {ownershipConditionList.length > 0 ?
                            ownershipConditionList.map(ownershipCondition => {
                                return (
                                    <option key={ownershipCondition.id_ownership_condition} value={ownershipCondition.id_ownership_condition}>{ownershipCondition.name_ownership_condition}</option>
                                )
                            }) : ''}
                    </select>
                </div>
            </div>
            <div className='control-button'>
                <ControlButton
                    titleAceptButton={"Guardar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickEditProperty}
                    backFunction={() => handleClickBackButton(!modalBackToPage)}
                />
            </div>

            <ModalMessagePerformed
                img={editPropertyIcon}
                title={"Aviso"}
                message={"Los datos han sido actualizados"}
                state={modalState}
                accept={handleClickPropertySuccesfull}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Algunos datos son obligatorios"}
                state={modalWarningState}
                accept={() => { changeModalWarningState(!modalWarningState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Error al editar los datos"}
                state={modalErrorState}
                accept={handleClickEditPropertyError}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"El nombre del predio es incorrecto"}
                state={modalPropertyNameErrorState}
                accept={() => { changeModalPropertyNameErrorState(!modalPropertyNameErrorState) }}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"El código de localización es incorrecto"}
                state={modalLocalizationCodeErrorState}
                accept={() => { changeModalLocalizationCodeErrorState(!modalLocalizationCodeErrorState) }}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"La ruta del predio es incorrecta"}
                state={modalRouteErrorState}
                accept={() => { changeModalRouteErrorState(!modalRouteErrorState) }}
            />
            <ModalActionPerformed
                img={warningIcon}
                title={"¿Deseas salir?"}
                message={"¡¡Se perderá toda la información sin guardar!!"}
                state={modalBackToPage}
                accept={handleClickProperty}
                cancel={handleClickBackButton}
            />
        </div>
    )

}