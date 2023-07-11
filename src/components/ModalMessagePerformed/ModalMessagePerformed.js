import React from "react"
import styled from "styled-components"
import "./ModalMessagePerformed.css"

export function ModalMessagePerformed({ img, title, message, state, accept }) {
    return (
        <div>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <img alt="" src={img} height={100} />
                        <p className="p-modal">{title}</p>
                        <p className="p-modal-message">{message}</p>
                        <div className="button-group">
                            <button onClick={accept} className="accept-modal-button">Aceptar</button>
                        </div>
                    </ModalContainer>
                </Overlay>}
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
`;