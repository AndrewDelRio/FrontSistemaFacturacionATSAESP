import React from "react"
import styled from "styled-components"
import "./ModalEditPersonalData.css"

export function ModalEditPersonalData({ state, title, inputType, acceptFunction }) {

    return (
        <div>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <p className="p-modal">{title}</p>
                        <input type={inputType} className="input-edit-personal-data" />
                        <button onClick={acceptFunction} className="accept-modal-button">Aceptar</button>
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