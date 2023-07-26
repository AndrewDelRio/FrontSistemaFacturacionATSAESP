import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import propertyIcon from "../../../assets/images/property.svg"
import searchIcon from "../../../assets/images/search.svg"
import warningIcon from "../../../assets/images/warning.svg"
import addPropertyIcon from "../../../assets/images/addProperty.svg"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getPropertyByID } from "../../../services/PropertiesService"
import { getEconomicDestinationProperty } from "../../../services/EconomicDestinationService"
import { getAddressInformationProperties } from "../../../services/PlacesService"
import { getPropertyTypes } from "../../../services/PropertiesTypeService"
import { getOwnerShipConditions } from "../../../services/OwnershipConditionService"
import { getStratums } from "../../../services/StratumService"
import './PropertiesWindow.css'
const defaultIconsColor = "#FFFFFF"

export function PropertiesWindows() {
    const navigate = useNavigate()

    const [idProperty, setIdProperty] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchProperty = (e) => {
        e.preventDefault();
        if (idProperty) {
            getPropertyByID(idProperty).then(res => {
                if (res) {
                    navigate('/secretary/property/' + idProperty)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const onEnterKeySearchProperty = (e) => {
        if (e.keyCode === 13) {
            handleClickSearchProperty(e)
        }
    }

    const handleClickAddProperty = () => {
        getEconomicDestinationProperty().then(res => {
            if (res) {
                getAddressInformationProperties().then(resAddress => {
                    if (resAddress) {
                        getPropertyTypes().then(resPropertiesTypes => {
                            if (resPropertiesTypes) {
                                getOwnerShipConditions().then(resOwnershipConditions => {
                                    if (resOwnershipConditions) {
                                        getStratums().then(resStratums => {
                                            if (resStratums) {
                                                navigate('/secretary/register-property')
                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }
    return (
        <div className='properties'>
            <img alt='' src={propertyIcon} height={100} className='properties-icon'></img>
            <p className='properties-title'><b>Predios</b></p>
            <div className='form-search-property'>
                <div className='search-property'>
                    <input type='number' placeholder='Nº de predio' className='input-id-property' value={idProperty} onChange={(e => setIdProperty(e.target.value))} onKeyDown={(e) => onEnterKeySearchProperty(e)} />
                    <button onClick={handleClickSearchProperty} className='button-search-property'>
                        <img src={searchIcon} alt='' width={40} height={40} fill={defaultIconsColor}></img>
                    </button>
                </div>
                <button onClick={handleClickAddProperty} className='button-register-property'>
                    <img src={addPropertyIcon} alt='' width={40} height={40} fill={defaultIconsColor} className='add-property-icon-button'></img>
                    <p>Registrar predio</p>
                </button>
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"El número predial ingresado no arrojó ningun resultado"}
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )

}
