import React from "react";
import { useState } from "react";
import billingIcon from "../../../assets/images/invoice.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getBillingPeriodID, getPeriod, getProjectedBillingPeriod, getBillingPeriodStructuredDate } from "../../../services/BillingPeriodServices"
import { getInvoiceLastPeriod } from "../../../services/BillingService"
import "./BillingWindow.css"
import { useNavigate } from "react-router-dom";

export function BillingWindow() {

    let period = {}
    const disabledButton = true;
    const noDisabledButton = false;
    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalNoBillingPeriod, changeModalNoBillingPeriod] = useState(false)

    const navigate = useNavigate()

    const handleClickModalNoBillingPeriod = () => {
        navigate('/secretary/register-sanctions')
    }

    const handleClickBillingPeriod = () => {
        const validatorPeriod = 0
        getBillingPeriodID().then((res) => {
            period = getPeriod();
            if (res) {
                if (period !== undefined && period.id_period !== validatorPeriod) {
                    getInvoiceLastPeriod(period.id_period).then((result) => {
                        if (result) {
                            getProjectedBillingPeriod().then((resBillingPeriod) => {
                                if (resBillingPeriod) {
                                    getBillingPeriodStructuredDate(period.id_period).then((resActualPeriod) => {
                                        if (resActualPeriod) {
                                            navigate('/secretary/verify-payments')
                                        }
                                    }).catch((err) => {
                                        changeModalErrorState(!modalErrorState)
                                    })

                                }
                            }).catch((err) => {
                                changeModalErrorState(!modalErrorState)
                            })
                        }
                    }).catch((err) => {
                        changeModalErrorState(!modalErrorState)
                    })
                } else {
                    getProjectedBillingPeriod().then((res) => {
                        if (res) {
                            changeModalNoBillingPeriod(!modalNoBillingPeriod)
                        } else {
                            changeModalErrorState(!modalErrorState)
                        }
                    }).catch((err) => {
                        changeModalErrorState(!modalErrorState)
                    })

                }
            } else {
                changeModalErrorState(!modalErrorState)
            }
        }).catch((err) => {
            console.log(err)
            changeModalErrorState(!modalErrorState)
        })
    }

    return (
        <div className="billing-container">
            <img alt="" src={billingIcon} width={100} className="billing-icon" />
            <p className="billing-title"><b>Facturación</b></p>

            <div className="billing-buttons">
                <button disabled={disabledButton} className={disabledButton ? "disabled-billing-button" : ""}>Generar factura</button>

                <button disabled={disabledButton} className={disabledButton ? "disabled-billing-button" : ""}>Consultar factura</button>

                <button disabled={disabledButton} className={disabledButton ? "disabled-billing-button" : ""}>Registrar cobros</button>

                <button disabled={noDisabledButton} className={noDisabledButton ? "disabled-billing-button" : ""} onClick={handleClickBillingPeriod}>Periodo de facturación</button>

                <button disabled={disabledButton} className={disabledButton ? "disabled-billing-button" : ""}>Refacturación</button>
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"Error al consultar el periodo de facturación"}
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title={"No hay periodos de facturación"}
                message={"Se ha creado uno con la configuración del sistema"}
                state={modalNoBillingPeriod}
                accept={handleClickModalNoBillingPeriod}
            />
        </div >
    )
}