import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editEnrollmentIcon from "../../../assets/images/enrollment.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalMessagePerformed } from '../../../components/ModalMessagePerformed/ModalMessagePerformed'
import { ModalActionPerformed } from '../../../components/ModalActionPerformed/ModalActionPerformed'
import ControlButton from '../../../components/ControlButton/ControlButton'
import { getSubscribersList } from "../../../services/SubscriberService"
import { getPropertiesList } from "../../../services/PropertiesService"
import { getEnrollment, getEnrollmentByID, getEnrollmentStatesList, editEnrollment } from "../../../services/EnrollmentService"
import { getUsesPublicServiceList } from "../../../services/UsePublicService"
import { editWaterMeter } from "../../../services/WaterMeterService"
import './EditEnrollmentWindow.css'

let enrollment = {}
let enrollmentStates = []
let subscriberList = []
let propertiesList = []
let usePublicServiceList = []
let waterMeterRegisterOptions = [
    { state: false, name: 'No' },
    { state: true, name: 'Sí' }
]

export function EditEnrollmentWindow() {
    enrollment = getEnrollment()
    enrollmentStates = getEnrollmentStatesList()
    subscriberList = getSubscribersList()
    propertiesList = getPropertiesList()
    usePublicServiceList = getUsesPublicServiceList()

    const [modalState, changeModalState] = useState(false)
    const [modalWarningState, changeModalWarningState] = useState(false)
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalWaterMeterErrorState, changeModalWaterMeterErrorState] = useState(false)
    const [modalWarningWaterMeterState, changeModalWarningWaterMeterState] = useState(false)
    const [modalStateBack, changeModalStateBack] = useState(false)

    const [associatedSubscriberState, setAssociatedSubscriberState] = useState(enrollment !== null ? enrollment.id_subscriber : '')
    const [associatedPropertyState, setassociatedPropertyState] = useState(enrollment !== null ? enrollment.id_property_number : '')
    const [stateEnrollmentState, setStateEnrollmentState] = useState(enrollment !== null ? enrollment.state_enrollment : '')
    const [serviceTypeState, setServiceTypeState] = useState(enrollment !== null ? enrollment.id_use_public_service : '')

    const [waterMeterState, setWaterMeterState] = useState(waterMeterRegisterOptions.length > 0 ? waterMeterRegisterOptions[0].state : false)
    const [serialWaterMeterState, setSerialWaterMeterState] = useState(enrollment !== null && enrollment.serial_water_meter !== 0 ? enrollment.serial_water_meter : '00000')
    const [brandWaterMeterState, setBrandWaterMeterState] = useState(enrollment !== null && enrollment.brand_water_meter !== 0 ? enrollment.brand_water_meter : 'Marca')
    const [diameterWaterMeterState, setDiameterWaterMeterState] = useState(enrollment !== null && enrollment.diameter_water_meter !== 0 ? enrollment.diameter_water_meter : '0.0')
    const [calibrationPercentageState, setCalibrationPercentageState] = useState(enrollment !== null && enrollment.calibration_percentage_water_meter !== 0 ? enrollment.calibration_percentage_water_meter : '0.0')
    const [calibrationDateState, setCalibrationDateState] = useState(enrollment !== null && enrollment.date_calibration_water_meter !== null ? enrollment.date_calibration_water_meter : '')

    const navigate = useNavigate()

    const handleClickBackToEnrollments = () => {
        navigate('/secretary/enrollment/' + enrollment.id_enrollment)
    }

    const handleClickEnrollmentSuccesfull = () => {
        changeModalState(!modalState)
        getEnrollmentByID(enrollment.id_enrollment).then(res => {
            if (res) {
                navigate('/secretary/enrollment/' + enrollment.id_enrollment)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClickBackButton = () => {
        changeModalStateBack(!modalStateBack);
    }

    const handleClickEditEnrollment = (e) => {
        e.preventDefault()
        if (associatedSubscriberState === "" || associatedPropertyState === "" || serviceTypeState === "") {
            changeModalWarningState(!modalWarningState)
        } else {
            if (waterMeterState && (serialWaterMeterState === "" || brandWaterMeterState === "" ||
                diameterWaterMeterState === "" || calibrationPercentageState === "" || calibrationDateState === "")) {
                changeModalWarningWaterMeterState(!modalWarningWaterMeterState)
            } else {
                const editedEnrollment = {
                    id_enrollment: enrollment.id_enrollment,
                    id_property_number: associatedPropertyState,
                    id_subscriber: Number(associatedSubscriberState),
                    state_enrollment: stateEnrollmentState,
                    id_use_public_service: Number(serviceTypeState)
                }
                if (waterMeterState) {
                    editEnrollment(editedEnrollment).then((resEnrollment) => {
                        if (resEnrollment) {
                            const editedWatermeter = {
                                old_serial_water_meter: enrollment.serial_water_meter,
                                serial_water_meter: Number(serialWaterMeterState),
                                brand_water_meter: brandWaterMeterState,
                                diameter_water_meter: parseFloat(diameterWaterMeterState),
                                calibration_percentage_water_meter: parseFloat(calibrationPercentageState),
                                date_calibration_water_meter: calibrationDateState,
                                id_enrollment: enrollment.id_enrollment
                            }
                            editWaterMeter(editedWatermeter).then((res) => {
                                if (res) {
                                    changeModalState(!modalState)
                                }
                            }).catch((err) => {
                                changeModalWaterMeterErrorState(!modalWaterMeterErrorState)
                            })
                        }
                    }).catch((err) => {
                        changeModalErrorState(!modalErrorState)
                    })

                } else {
                    editEnrollment(editedEnrollment).then((resEnrollment) => {
                        if (resEnrollment) {
                            changeModalState(!modalState)
                        }
                    }).catch((err) => {
                        changeModalErrorState(!modalErrorState)
                    })

                }
            }
        }
    }

    return (
        <div className='edit-enrollment'>
            <img src={editEnrollmentIcon} alt='' height={50} className='edit-enrollment-icon' />
            <p>Editar matrícula</p>
            <div className='edit-enrollment-form'>
                <p>Datos de la matrícula</p>
                <div className='enrrollment-identification-container'>
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
                        <p>Estado de la matrícula</p>
                        <select className='input-info-enrollment' value={stateEnrollmentState} onClick={(e) => setStateEnrollmentState(e.target.value)} onChange={(e) => setStateEnrollmentState(e.target.value)}>
                            {enrollmentStates.length > 0 ?
                                enrollmentStates.map(enrollmentState => {
                                    return (
                                        <option key={enrollmentState} value={enrollmentState}>{enrollmentState}</option>
                                    )
                                })
                                : <option key={0} value={0}>{'-'}</option>}
                        </select>
                    </div>
                    <div>
                        <p>Tipo de servicio *</p>
                        <select className='input-info-enrollment' value={serviceTypeState} onClick={(e) => setServiceTypeState(e.target.value)} onChange={(e) => setServiceTypeState(e.target.value)}>
                            {usePublicServiceList.length > 0 ?
                                usePublicServiceList.map(useService => {
                                    return (
                                        <option key={useService.id_use_public_service} value={useService.id_use_public_service}>{useService.name_use_public_service + ' (' + useService.abreviation_use_public_service + ')'}</option>
                                    )
                                })
                                : <option key={0} value={0}>{'-'}</option>}
                        </select>
                    </div>
                </div>
                <p>Datos del medidor</p>
                <div className='watermeter-dates-container'>
                    <div>
                        <p>Actualizar medidor</p>
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
            </div>
            <div className='control-button'>
                <ControlButton
                    titleAceptButton={"Actualizar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickEditEnrollment}
                    backFunction={() => changeModalStateBack(!modalStateBack)}
                />
            </div>
            <ModalMessagePerformed
                img={editEnrollmentIcon}
                title="Aviso"
                message={"Matricula actualizada satisfactoriamente"}
                state={modalState}
                accept={handleClickEnrollmentSuccesfull}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={handleClickEditEnrollment}
            />

            <ModalMessagePerformed
                img={warningIcon}
                title="Aviso"
                message="Algunos datos del medidor son obligatorios"
                state={modalWarningWaterMeterState}
                accept={handleClickEditEnrollment}
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