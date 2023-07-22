import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscribersWindow.css"
import subscriberIcon from "../../../assets/images/subscribers.svg"
import searchIcon from "../../../assets/images/search.svg"
import warningIcon from "../../../assets/images/warning.svg"
import addSubscriberIcon from "../../../assets/images/addSubscriber.svg"
import { getSubscriberByID } from "../../../services/SubscriberService"
import { ModalMessagePerformed } from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import { getDocumentType } from "../../../services/DocumentTypeService"
import { getGenders } from "../../../services/GenderService";
import { getDepartmets } from "../../../services/PlacesService"
const defaultIconsColor = "#FFFFFF"

const SubscribersWindow = () => {
    const navigate = useNavigate()

    const [idSubscriber, setIdSubscriber] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchSubscriber = (e) => {
        e.preventDefault();
        if (idSubscriber) {
            getSubscriberByID(idSubscriber).then(
                res => {
                    if (res) {
                        navigate('/secretary/subscriber/' + idSubscriber)
                    } else {
                        setModalNotFoundState(!modalNotFoundState)
                    }
                }).catch(
                    err => {
                        console.log(err)
                    })
        }
    }

    const handleClickAddSubscriber = () => {
        getDocumentType().then(res => {
            if (res) {
                getGenders().then(res => {
                    if (res) {
                        getDepartmets().then(res => {
                            if (res) {
                                navigate('/secretary/register-subscriber')
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const onEnterKeySearchSubscriber = (e) => {
        if (e.keyCode == 13) {
            handleClickSearchSubscriber(e)
        }
    }

    return (
        <div className="subscribers">
            <img src={subscriberIcon} alt="" width={100} className="subscribers-icon" />
            <p className="subscribers-title"><b>Suscriptores</b></p>
            <div className="form-search-subscriber">
                <div className="search-subscriber">
                    <input type="number" placeholder="Nº del documento del suscriptor" className="input-id-subscriber" value={idSubscriber} onChange={(e) => setIdSubscriber(e.target.value)} onKeyDown={onEnterKeySearchSubscriber} />
                    <button onClick={handleClickSearchSubscriber} className="button-search-subscribers">
                        <img src={searchIcon} alt="" width={40} height={40} fill={defaultIconsColor} />
                    </button>
                </div>
                <button onClick={handleClickAddSubscriber} className="button-register-new-subscriber">
                    <img src={addSubscriberIcon} alt="" width={40} height={40} fill={defaultIconsColor} className="add-subscriber-icon-button"></img>
                    <p>Registrar suscriptor</p>
                </button>
            </div>
            <ModalMessagePerformed
                img={warningIcon}
                title={"Error"}
                message={"El número de documento ingresado no arrojó ningun resultado"}
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}

export default SubscribersWindow
