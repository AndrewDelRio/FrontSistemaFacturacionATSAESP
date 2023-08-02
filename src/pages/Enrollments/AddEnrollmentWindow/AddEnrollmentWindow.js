import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addEnrollmentIcon from "../../../assets/images/addEnrollment.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalMessagePerformed } from '../../../components/ModalMessagePerformed/ModalMessagePerformed'
import { ModalActionPerformed } from '../../../components/ModalActionPerformed/ModalActionPerformed'
import ControlButton from '../../../components/ControlButton/ControlButton'
import { getSubscribersList } from "../../../services/SubscriberService"
import { getPropertiesList } from "../../../services/PropertiesService"
import { getUsesPublicServiceList } from "../../../services/UsePublicService"
import { getFinancingList } from "../../../services/FinancingService"
import { getServicesPublicList } from "../../../services/DomesticPublicServices"
import { addEnrollment, getEnrollmentID } from "../../../services/EnrollmentService"
import { addWaterMeter } from "../../../services/WaterMeterService"
import { addServicePublicToListContracted } from "../../../services/ContractedPublicServiceService"
import './AddEnrollmentWindow.css'

let subscriberList = []
let propertiesList = []
let usePublicServiceList = []
let financingList = {}
let servicesPublicList = []
let waterMeterRegisterOptions = [
    { state: false, name: 'No' },
    { state: true, name: 'Sí' }
]
let maxCuotes = 0
let cuotesList = []

export function AddEnrollmentWindow() {
    subscriberList = getSubscribersList()
    propertiesList = getPropertiesList()
    usePublicServiceList = getUsesPublicServiceList()
    financingList = getFinancingList()
    servicesPublicList = getServicesPublicList()
    maxCuotes = financingList !== null ? financingList.cuotes_financing : 36
    for (let i = 0; i < maxCuotes; i++) {
        cuotesList[i] = i + 1;

    }
    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalWaterMeterErrorState, changeModalWaterMeterErrorState] = useState(false)
    const [modalWarningWaterMeterState, changeModalWarningWaterMeterState] = useState(false)
    const [modalWarningPublicServices, changeModalWarningPublicServices] = useState(false)
    const [modalStateBack, changeModalStateBack] = useState(false)

    const [adwardDateState, setAdwardDateState] = useState("")
    const [associatedSubscriberState, setAssociatedSubscriberState] = useState(subscriberList.length > 0 ? subscriberList[0].id_subscriber : '')
    const [associatedPropertyState, setassociatedPropertyState] = useState(propertiesList.length > 0 ? propertiesList[0].id_property_number : '')
    const [serviceTypeState, setServiceTypeState] = useState(usePublicServiceList.length > 0 ? usePublicServiceList[0].id_use_public_service : '')
    const [financingCuotesState, setFinancingCuotesState] = useState(cuotesList.length > 0 ? cuotesList[0] : 0)
    const [waterMeterState, setWaterMeterState] = useState(waterMeterRegisterOptions.length > 0 ? waterMeterRegisterOptions[0].state : false)
    const [serialWaterMeterState, setSerialWaterMeterState] = useState("")
    const [brandWaterMeterState, setBrandWaterMeterState] = useState("")
    const [diameterWaterMeterState, setDiameterWaterMeterState] = useState("")
    const [calibrationPercentageState, setCalibrationPercentageState] = useState("")
    const [calibrationDateState, setCalibrationDateState] = useState("")
    const [servicePublicListState, setServicePublicListState] = useState(new Array(servicesPublicList !== null ? servicesPublicList.length : 1).fill(false))

    const [idEnrollmentState, setIdEnrollmentState] = useState(0)

    const navigate = useNavigate()

    const handleClickBackToEnrollments = () => {
        navigate('/secretary/enrollments')
    }

    const createListContractedPublicServices = () => {
        let servicePublicList = [];
        for (let i = 0; i < servicePublicListState.length; i++) {
            if (servicePublicListState[i]) {
                servicePublicList.push(servicesPublicList[i].id_domestic_public_service);
            }

        }
        return servicePublicList;
    }

    /**
     * Validar si un check está seleccionado
     * @param {*} position 
     * @returns 
     */
    const handleOnChangeCheckBox = (position) => {
        const updatedCheckedState = servicePublicListState.map((item, index) =>
            index === position ? !item : item
        );

        setServicePublicListState(updatedCheckedState);
    }

    const handleClickBackButton = () => {
        changeModalStateBack(!modalStateBack);
    }

    const handleClickAddEnrollment = (e) => {
        e.preventDefault()
        if (adwardDateState === "" || associatedSubscriberState === "" || associatedPropertyState === "" || serviceTypeState === "" || financingCuotesState === "") {
            changeModalWarningState(!modalWarningState)
        } else {
            if (waterMeterState && (serialWaterMeterState === "" || brandWaterMeterState === "" ||
                diameterWaterMeterState === "" || calibrationPercentageState === "" || calibrationDateState === "")) {
                changeModalWarningWaterMeterState(!modalWarningWaterMeterState)
            } else {
                let counter = 0;
                servicePublicListState.forEach(element => {
                    if (element === false) {
                        counter++;
                    }
                });
                if (counter === servicePublicListState.length) {
                    changeModalWarningPublicServices(!modalWarningPublicServices)
                } else {
                    const newEnrollment = {
                        date_adward: adwardDateState,
                        id_financing: Number(financingList.id_financing),
                        id_property_number: associatedPropertyState,
                        id_subscriber: Number(associatedSubscriberState),
                        cuotes_financing: Number(financingCuotesState),
                        id_use_public_service: Number(serviceTypeState)
                    }
                    if (waterMeterState) {
                        addEnrollment(newEnrollment).then((resEnrollment) => {
                            if (resEnrollment) {
                                setIdEnrollmentState(getEnrollmentID())
                                const newWatermeter = {
                                    serial_water_meter: Number(serialWaterMeterState),
                                    brand_water_meter: brandWaterMeterState,
                                    diameter_water_meter: parseFloat(diameterWaterMeterState),
                                    calibration_percentage_water_meter: parseFloat(calibrationPercentageState),
                                    date_calibration_water_meter: calibrationDateState,
                                    id_enrollment: getEnrollmentID()
                                }
                                addWaterMeter(newWatermeter).then((res) => {
                                    if (res) {
                                        let data = {
                                            servicePublicList: createListContractedPublicServices(),
                                            id_enrollment: getEnrollmentID()
                                        }
                                        addServicePublicToListContracted(data).then((res) => {
                                            if (res) {
                                                changeModalState(!modalState)
                                            }
                                        }).catch((err) => {
                                            changeModalErrorState(!modalErrorState)
                                        })
                                    }
                                }).catch((err) => {
                                    changeModalWaterMeterErrorState(!modalWaterMeterErrorState)
                                })
                            }
                        }).catch((err) => {
                            changeModalErrorState(!modalErrorState)
                        })
                    } else {
                        addEnrollment(newEnrollment).then((resEnrollment) => {
                            if (resEnrollment) {
                                setIdEnrollmentState(getEnrollmentID())
                                let data = {
                                    servicePublicList: createListContractedPublicServices(),
                                    id_enrollment: getEnrollmentID()
                                }
                                addServicePublicToListContracted(data).then((res) => {
                                    if (res) {
                                        changeModalState(!modalState)
                                    }
                                }).catch((err) => {
                                    changeModalErrorState(!modalErrorState)
                                })

                            }
                        }).catch((err) => {
                            changeModalErrorState(!modalErrorState)
                        })
                    }
                }
            }
        }
    }

    return (
        <div className='add-enrollment'>
            <img src={addEnrollmentIcon} alt='' height={50} className='add-enrollment-icon' />
            <p>Agregar matrícula</p>
            <div className='add-enrollment-form'>
                <p>Datos de la matrícula</p>
                <div className='enrrollment-identification-container'>
                    <div>
                        <p>Fecha de adjudicación</p>
                        <input className='input-info-enrollment' min={'2010-01-01'} max={new Date().toISOString().slice(0, 10)} type="date" value={adwardDateState} onChange={(e) => setAdwardDateState(e.target.value)} />
                    </div>

                    <div>
                        <p>Suscriptor asociado *</p>
                        <select className='input-info-enrollment' value={associatedSubscriberState} onClick={(e) => setAssociatedSubscriberState(e.target.value)} onChange={(e) => setAssociatedSubscriberState(e.target.value)}>
                            {subscriberList.length > 0 ?
                                subscriberList.map(subscriber => {
                                    return (
                                        <option key={subscriber.id_subscriber} value={subscriber.id_subscriber}>{subscriber.names_subscriber + ' ' + subscriber.lastnames_subscriber}</option>
                                    )
                                })
                                : <option key={0} value={0}>{'-'}</option>}
                        </select>
                    </div>
                    <div>
                        <p>Predio asociado *</p>
                        <select className='input-info-enrollment' value={associatedPropertyState} onClick={(e) => setassociatedPropertyState(e.target.value)} onChange={(e) => setassociatedPropertyState(e.target.value)}>
                            {propertiesList.length > 0 ?
                                propertiesList.map(property => {
                                    return (
                                        <option key={property.id_property_number} value={property.id_property_number}>{property.name_property}</option>
                                    )
                                })
                                : <option key={0} value={0}>{'-'}</option>}

                        </select>
                    </div>
                    <div>
                        <p>Tipo de servicio *</p>
                        <select className='input-info-enrollment' value={serviceTypeState} onClick={(e) => setServiceTypeState(e.target.value)} onChange={(e) => setServiceTypeState(e.target.value)}>
                            {servicesPublicList.length > 0 ?
                                usePublicServiceList.map(useService => {
                                    return (
                                        <option key={useService.id_use_public_service} value={useService.id_use_public_service}>{useService.name_use_public_service + ' (' + useService.abreviation_use_public_service + ')'}</option>
                                    )
                                })
                                : <option key={0} value={0}>{'-'}</option>}
                        </select>
                    </div>
                </div>
                <p>Financiación</p>
                <div className='financing-enrollment-container'>
                    <div>
                        <p>Cuotas</p>
                        <select className='input-info-enrollment' value={financingCuotesState} onChange={(e) => setFinancingCuotesState(e.target.value)} onClick={(e) => setFinancingCuotesState(e.target.value)}>
                            {
                                cuotesList.length > 0 ?
                                    cuotesList.map(cuote => {
                                        return (
                                            <option key={cuote} value={cuote}>{cuote}</option>
                                        )
                                    }) : <option key={0} value={0}>{'-'}</option>
                            }
                        </select>
                    </div>
                    <div>
                        <p>Valor</p>
                        <input className='input-info-enrollment' placeholder='0.0' type='number' disabled={true} value={financingList.value_financing !== null ? Number.parseFloat(financingList.value_financing).toFixed(2) : 0}></input>
                    </div>

                    <div>
                        <p>Interéses(%)</p>
                        <input placeholder='0.0' className='input-info-enrollment' type='number' disabled={true} value={financingList.percentage_interest !== null ? Number.parseFloat(financingList.percentage_interest).toFixed(2) : 0}></input>
                    </div>

                    <div>
                        <p>Cuota mensual</p>
                        <input className='input-info-enrollment' placeholder='0.0' type='number' disabled={true} value={financingList.value_financing !== null ? Number.parseFloat((financingList.value_financing / financingCuotesState) + ((financingCuotesState !== '1') ? ((financingList.value_financing * financingList.percentage_interest) / 100) : 0)).toFixed(2) : 0}></input>
                    </div>
                </div>
                <p>Datos del medidor</p>
                <div className='watermeter-dates-container'>
                    <div>
                        <p>Registrar medidor</p>
                        <select className='input-info-enrollment' value={waterMeterState} onChange={(e) => setWaterMeterState(e.target.value === 'true')} onClick={(e) => setWaterMeterState(e.target.value === 'true')}>
                            {waterMeterRegisterOptions !== null ?
                                waterMeterRegisterOptions.map(watermeterOption => {
                                    return (
                                        <option key={watermeterOption.state} value={watermeterOption.state}>{watermeterOption.name}</option>
                                    )
                                }) : <option key={0} value={0}>{'-'}</option>}
                        </select>
                    </div>

                    <div>
                        <p >Serial *</p>
                        <input type='number' className={!waterMeterState ? "input-info-enrollment" : "input-info-enrollment-enabled"} disabled={!waterMeterState} value={serialWaterMeterState} onChange={(e) => setSerialWaterMeterState(e.target.value)} placeholder='000000000000' />
                    </div>

                    <div>
                        <p>Marca *</p>
                        <input type="text" className={!waterMeterState ? "input-info-enrollment" : "input-info-enrollment-enabled"} disabled={!waterMeterState}
                            value={brandWaterMeterState} onChange={(e) => { setBrandWaterMeterState(e.target.value) }} placeholder='Marca'
                        />
                    </div>
                    <div>
                        <p>Diametro *</p>
                        <input type="number" className={!waterMeterState ? "input-info-enrollment" : "input-info-enrollment-enabled"} disabled={!waterMeterState}
                            value={diameterWaterMeterState} onChange={(e) => { setDiameterWaterMeterState(e.target.value) }} placeholder='0.0' step={'0.5'}
                        />
                    </div>
                    <div>
                        <p>Calibración (%) *</p>
                        <input type="number" className={!waterMeterState ? "input-info-enrollment" : "input-info-enrollment-enabled"}
                            disabled={!waterMeterState} value={calibrationPercentageState}
                            onChange={(e) => { setCalibrationPercentageState(e.target.value) }} placeholder='0.0' step={'0.1'}
                        />
                    </div>
                    <div>
                        <p>Fecha de calibración *</p>
                        <input type="date" min={'2023-01-01'} max={new Date().toISOString().slice(0, 10)} className={!waterMeterState ? "input-info-enrollment" : "input-info-enrollment-enabled"}
                            disabled={!waterMeterState} value={calibrationDateState}
                            onChange={(e) => { setCalibrationDateState(e.target.value) }}
                        />
                    </div>
                </div>
                <p>Servicios públicos</p>
                <div className='services-public-container'>
                    {servicesPublicList != null && servicesPublicList.length > 0 ?
                        servicesPublicList.map((service, i) => {
                            return (
                                <label className='options-check-data' key={service.id_domestic_public_service} value={service.id_domestic_public_service}><input type='checkbox' checked={servicePublicListState[i]} onChange={() => handleOnChangeCheckBox(i)} onClick={() => handleOnChangeCheckBox(i)} />{service.name_domestic_public_service}</label>
                            )
                        }) : <label className='options-check-data' key={0} value={0}>{'No registran servicios públicos'}</label>}
                </div>
            </div>
            <div className='control-button'>
                <ControlButton
                    titleAceptButton={"Registrar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickAddEnrollment}
                    backFunction={() => changeModalStateBack(!modalStateBack)}
                />
            </div>
            <ModalMessagePerformed
                img={addEnrollmentIcon}
                title="Aviso"
                message={"Matricula registrada exitosamente con el Código: " + ('00000' + idEnrollmentState).slice(-5)}
                state={modalState}
                accept={handleClickBackToEnrollments}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={handleClickAddEnrollment}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Algunos datos del medidor son obligatorios"
                state={modalWarningWaterMeterState}
                accept={handleClickAddEnrollment}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Debes seleccionar al menos un servicio público"
                state={modalWarningPublicServices}
                accept={handleClickAddEnrollment}
            />

            <ModalActionPerformed
                img={warningIcon}
                title={"¿Deseas salir?"}
                message={"¡¡Se perderá toda la información sin guardar!!"}
                state={modalStateBack}
                accept={handleClickBackToEnrollments}
                cancel={handleClickBackButton}
            />
        </div >
    )
}