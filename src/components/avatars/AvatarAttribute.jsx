import React from 'react'
import palette from '../../assets/color-palette.svg'
import { HexColorPicker } from "react-colorful";

const capitalize = (letter) => {
    return letter && letter[0].toUpperCase() + letter.slice(1);
}

function Option(props) {
    const {stateValue, id,name} = props 
    return (
            <p id={id} className={`opt ${stateValue === id ? 'active' : ''}`} >{name}</p>
    )
}

function AvatarAttribute(props) {
    return (
        <div>
            <div className="color-picker">
                <p className="field">{props.title}</p>
                    {
                        props.pickerID !== undefined ? 
                        <div className="colorPanelWrapper">
                            <img src={palette}  alt="Custom Color" className='icon-palette' id={props.pickerID} onClick={props.onPickerClick}/>
                                { props.pickerType ?  (<HexColorPicker className='colorPanel' color={props.colorValue} onChange={props.onColorChange    }/>) : null }    
                        </div> : null
                    }
            </div>
                
            <div className="opts" id={props.id} onClick={props.onClick}>
                    {props.styleOpts.map((style,index) => (
                        <Option key={index} id={style} name={ capitalize( props.optsObj !== undefined ? props.optsObj[style] : style)} stateValue={props.stateValue}/>
                    ))}
            </div>
        </div>
    )
}



export default AvatarAttribute
