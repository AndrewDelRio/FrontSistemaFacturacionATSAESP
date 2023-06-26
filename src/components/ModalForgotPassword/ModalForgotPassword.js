import React from "react"
import styled from "styled-components"
import closeIcon from "../../assets/images/close.svg"
import appIcon from "../../assets/images/Logo.png"
import "./ModalForgotPassword.css"

export default function ModalForgotPassword({state, closeFunction, title, content,acceptFunction}) {
    return (
        <div>
            {state && 
            <Overlay>
                <ModalContainer>
                    <input type="image" src={closeIcon} width={25} onClick={closeFunction} className="button-close" alt = ""/>
                    <img src={appIcon} width={80} alt = ""/>
                    {title}
                    {content}
                    <button onClick={acceptFunction} className="accept-modal-button">Enviar</button>
                </ModalContainer>
            </Overlay>
            }
        </div>
    )
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center
`;

const ModalContainer = styled.div`
    background: #ffffff;
    position: relative;
    border-radius: 10px;
    padding-inline: 40px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`