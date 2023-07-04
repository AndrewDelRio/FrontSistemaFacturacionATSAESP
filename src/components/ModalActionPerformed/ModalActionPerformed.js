import React from "react"
import styled from "styled-components"
import "./ModalActionPerformed.css"

export function ModalActionPerformed({ img, title, state, accept, cancel }) {
    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <img alt="" src={img} height={100} />
                        <p className="p-modal">{title}</p>
                        <button onClick={accept} className="accept-modal-button">Sí</button>
                        <button onClick={cancel} className="cancel-modal.button">No</button>
                    </ModalContainer>
                </Overlay>}
        </>
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