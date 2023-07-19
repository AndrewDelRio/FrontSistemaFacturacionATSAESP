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
import { getAddressInformationProperty } from "../../../services/AddressService"
import './PropertiesWindows.css'
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

    const handleClickAddProperty = () => {
        getEconomicDestinationProperty().then(res => {
            if (res) {
                getAddressInformationProperty().then(resAddress => {
                    if (resAddress) {
                        navigate('/secretary/register-property')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }
    return (
        <div className='enrollments'>
            <img alt='' src={propertyIcon} height={100} className='enrollments-icon'></img>
            <p className='enrollments-title'><b>Predios</b></p>
            <div className='form-search-enrollment'>
                <div className='search-enrollment'>
                    <input type='number' placeholder='Nº de predio' className='input-id-enrollment' value={idProperty} onChange={(e => setIdProperty(e.target.value))} />
                    <button onClick={handleClickSearchProperty} className='button-search-properties'>
                        <img src={searchIcon} alt='' width={40} height={40} fill={defaultIconsColor}></img>
                    </button>
                </div>
                <button onClick={handleClickAddProperty} className='button-register-properties'>
                    <img src={addPropertyIcon} alt='' width={40} height={40} fill={defaultIconsColor} className='add-enrollment-icon-button'></img>
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
