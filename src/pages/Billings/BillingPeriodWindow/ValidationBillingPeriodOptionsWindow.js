import React from "react";
import billingIcon from "../../../assets/images/invoice.svg"
import { useNavigate } from "react-router-dom";
import { getBillingPeriodStructuredDateInfo, getProjectedBillingPeriodNameStructured } from "../../../services/BillingPeriodServices"
import { getInvoiceLastPeriodList } from "../../../services/BillingService"
import './ValidationBillingPeriodOptionsWindow.css'
import exportFromJSON from 'export-from-json'

let projectedBillingPeriod = ""
let actualPeriod = ""
let invoiceLastPeriod = []

export function ValidationBillingPeriodOptionsWindow() {

    actualPeriod = getBillingPeriodStructuredDateInfo()
    projectedBillingPeriod = getProjectedBillingPeriodNameStructured()
    invoiceLastPeriod = getInvoiceLastPeriodList()

    const navigate = useNavigate()

    const handleClickBackToBilling = () => {
        navigate('/secretary/billing')
    }

    const handleClickDownloadFile = () => {
        const data = invoiceLastPeriod
        const fileName = 'invoices'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }

    const handleOnClickVerifyManually = () => {
        navigate('/secretary/verify-payments-manually')
    }

    return (
        <div className="billing-validation-container">
            <img alt="" src={billingIcon} width={100} className="billing-icon" />
            <div className="billing-periods-container">
                <p><b>Periodo actual de facturación:</b> {projectedBillingPeriod} </p>
                <p><b>Verificación de pagos periodo:</b> {actualPeriod}</p>
            </div>

            <div className="billing-validations-buttons">
                <button disabled={true} onClick={handleClickDownloadFile} className="disabled-button">Descargar archivo para pagos</button>

                <button disabled={true} className="disabled-button">Cargar archivo de pagos</button>

                <button onClick={handleOnClickVerifyManually}>Verificar manualmente</button>

                <button className={"back-billing-validation-button"} onClick={handleClickBackToBilling}>Volver</button>
            </div>

        </div >
    )
}