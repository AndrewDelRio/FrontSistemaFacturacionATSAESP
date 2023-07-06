import React from "react"
import './ControlButton.css'

const ControlButton = ({ titleAceptButton, titleBackButton, acceptFunction, backFunction }) => {
    return (
        <div className="control-button">
            <button className="accept-button" onClick={acceptFunction}>{titleAceptButton}</button>
            <button className="back-button" onClick={backFunction}>{titleBackButton}</button>
        </div>
    )
}

export default ControlButton
