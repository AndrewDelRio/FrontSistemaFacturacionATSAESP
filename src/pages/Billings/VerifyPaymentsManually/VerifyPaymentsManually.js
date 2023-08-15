import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import billingIcon from "../../../assets/images/invoice.svg"
import warningIcon from "../../../assets/images/warning.svg"
import { getBillingPeriodStructuredDateInfo, getProjectedBillingPeriodNameStructured } from "../../../services/BillingPeriodServices"
import { getInvoiceLastPeriodList, paidInvoices } from "../../../services/BillingService"
import { getChargeTypes, getCharge, getChargeTypesList } from "../../../services/ChargesServices"
import ControlButton from "../../../components/ControlButton/ControlButton"
import { ModalActionPerformed } from "../../../components/ModalActionPerformed/ModalActionPerformed"
import { ModalMessagePerformed } from '../../../components/ModalMessagePerformed/ModalMessagePerformed'
import './VerifyPaymentsManually.css'

let projectedBillingPeriod = ""
let actualPeriod = ""
let invoiceLastPeriod = []

export function VerifyPaymentsManually() {

    actualPeriod = getBillingPeriodStructuredDateInfo()
    projectedBillingPeriod = getProjectedBillingPeriodNameStructured()
    invoiceLastPeriod = getInvoiceLastPeriodList()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalErrorTypeCharges, changeModalErrorTypeCharges] = useState(false)
    const [modalAlertState, changeModalAlertState] = useState(false)
    const [modalStateBack, changeModalStateBack] = useState(false)
    const [modalStateContinue, changeModalStateContinue] = useState(false)
    const [modalAddedBillings, changeModalAddedBillings] = useState(false)

    const navigate = useNavigate()

    const handleClickBackButton = () => {
        changeModalStateBack(!modalStateBack)
    }
    const handleClickBackInvoicing = () => {
        navigate('/secretary/verify-payments')
    }

    const handleClickContinueButton = () => {
        changeModalStateContinue(!modalStateContinue)
    }


    const handleClickRegisterPayments = () => {
        let paymentList = []
        invoiceLastPeriod.map(invoice => {
            if (invoice.not_make_payment) {
                const newInvoice = {
                    id_bill: invoice.Numero_de_factura,
                    invoice_payment_date: invoice.Fecha_de_pago
                }
                paymentList.push(newInvoice)
            }
        })

        const invoicePaymentList = { payment_list: paymentList };

        if (invoicePaymentList.payment_list.length === 0) {
            changeModalAlertState(!modalAlertState)
        } else {
            paidInvoices(invoicePaymentList).then((res) => {
                if (res.data.ok) {
                    changeModalAddedBillings(!modalAddedBillings)
                }
            }).catch((err) => {
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    const errorToUpdateBillings = () => {
        changeModalErrorState(!modalErrorState)
        changeModalStateContinue(!modalStateContinue)
    }

    const acceptRegisterSanctions = () => {
        getChargeTypes().then((resPaymentTypes) => {
            if (resPaymentTypes) {
                getCharge(getChargeTypesList()[0].type_charge).then(resPayment => {
                    navigate('/secretary/register-sanctions')
                }).catch((err) => {
                    changeModalErrorTypeCharges(!modalErrorTypeCharges)
                })
            }
        }).catch(err => {
            changeModalErrorTypeCharges(!modalErrorTypeCharges)
        })
    }

    return (
        <div className="billing-validation-manually-container">
            <img alt="" src={billingIcon} width={100} className="billing-icon" />
            <div className="billing-periods-container">
                <p className='actual-billing-period'><b>Periodo actual de facturación: {projectedBillingPeriod} </b></p>
                <p><b>Verificación de pagos periodo:</b> {actualPeriod}</p>
            </div>
            <div className="table-check-payments">
                <table>
                    <thead>
                        <tr>
                            <th>N° de Factura</th>
                            <th>Nombre del suscriptor</th>
                            <th>Dirección</th>
                            <th>Valor factura</th>
                            <th>Fecha de pago</th>
                            <th>¿Pagó?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceLastPeriod.length > 0 ? invoiceLastPeriod.map(invoice => {
                            return (
                                <tr key={invoice.Numero_de_factura}>
                                    <td>{invoice.Numero_de_factura}</td>
                                    <td>{invoice.Nombres_del_suscriptor}</td>
                                    <td>{invoice.Direccion_del_predio}</td>
                                    <td>{formatter.format(invoice.Valor_total_factura)}</td>
                                    <td><input className='date-input' type='date' min={invoice.date_issue_bill.slice(0, 10)} max={invoice.date_payment_max_billing.slice(0, 10)} value={invoice.date_payment_max_billing.slice(0, 10)} onChange={(e) => invoice.Fecha_de_pago = e.target.value}></input></td>
                                    <td><input className="check-payment" type="checkbox" onChange={(e) => invoice.not_make_payment = e.target.checked} /></td>
                                </tr>
                            )
                        })
                            :
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='control-buttons'>
                <ControlButton
                    titleAceptButton={"Continuar"}
                    titleBackButton={"Volver"}
                    acceptFunction={handleClickContinueButton}
                    backFunction={handleClickBackButton}
                />
            </div>
            <ModalActionPerformed
                img={warningIcon}
                title={"¿Deseas salir?"}
                message={"¡¡Se perderá toda la información sin guardar!!"}
                state={modalStateBack}
                accept={handleClickBackInvoicing}
                cancel={handleClickBackButton}
            />

            <ModalActionPerformed
                img={warningIcon}
                title={"¿Registrar datos?"}
                message={"¡¡No podrás editar la información posteriormente!!"}
                state={modalStateContinue}
                accept={handleClickRegisterPayments}
                cancel={handleClickContinueButton}
            />

            <ModalMessagePerformed
                img={billingIcon}
                title="Alerta"
                message={"!!Ninguna factura fue cancelada, se aplicarán el cobro de intereses a todas las facturas!!"}
                state={modalAlertState}
                accept={acceptRegisterSanctions}
            />
            <ModalMessagePerformed
                img={billingIcon}
                title="Aviso"
                message={"!Facturas actualizadas satisfactoriamente, por favor registre los cobros!!"}
                state={modalAddedBillings}
                accept={acceptRegisterSanctions}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message={"!Error al actualizar las facturas, por favor intente nuevamente!!"}
                state={modalErrorState}
                accept={errorToUpdateBillings}
            />
            <ModalMessagePerformed
                img={warningIcon}
                title="Error"
                message={"!Error al obtener los cobros de la base de datos!!"}
                state={modalErrorTypeCharges}
                accept={() => changeModalErrorTypeCharges(!modalErrorTypeCharges)}
            />
        </div >
    )
}