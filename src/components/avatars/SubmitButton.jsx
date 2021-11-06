
import React from 'react'
import './SubmitButton.scss'

function SubmitButton(props) {
    return (
        <div>
            <input id="trigger"  onClick={props.onClick} className={ props.infoFilled? 'animate-submit' : 'disable-submit'} type="checkbox" hidden></input>
            <label className="trigger" title={props.infoFilled? '' : 'Fill the required info' } htmlFor="trigger">Submit</label>
            <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}

export default SubmitButton
