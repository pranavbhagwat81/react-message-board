import React, { Component } from 'react'
import Avatar from 'react-nice-avatar'
import './CustomAvatar.scss'
import AvatarAttribute from './AvatarAttribute'
import { connect } from 'react-redux'
import {updateAvatar} from '../..//store/actions/avatarActions'

export class CustomAvatar extends Component {
    constructor(props){
        super(props)
        // console.log(props)
        this.state = {
                openHairColorPicker : false,
                openShirtColorPicker : false,
                openFaceColorPicker : false,
                showRandomStylesTooltip : true,
        }

        this.styleOpts = {
            sex : ['man', 'woman'],
            faceColor : {'#F9C9B6' : 'Light','#de937d': 'Brown','#AC6651' : 'Dark'},
            earSize : ['small','big'],
            hairStyle : {'normal':'Normal', 'thick':'Thick', 'mohawk':'Mohowk', 'womanLong':'Long', 'womanShort':'Short'},
            eyeStyle : ['circle', 'oval', 'smile'],
            glassesStyle : ['none', 'round', 'square'],
            noseStyle : ['short', 'long', 'round'],
            mouthStyle : ['laugh', 'smile', 'peace'],
            shirtStyle : ['hoody', 'short', 'polo']
        }
    }


    updateAvatarinState(newStyle) {
        this.props.updateAvatarAction(newStyle)
    }

    handleClick = (e) => {
        const [target,parentClass] = [e.target.id,e.currentTarget.id]
        // console.log(parentClass)
        // console.log(target)
        if(target !== parentClass){
            // this.setState({[parentClass] : target }, () => this.updateAvatarinState())
            this.updateAvatarinState({[parentClass] : target })
        }
    }



    capitalize = (letter) => {
        return letter && letter[0].toUpperCase() + letter.slice(1);
    }

    Option(props) {
        const {stateValue, id,name} = props 
        // console.log(stateValue,id)
        return (
                <p id={id} className={`opt ${stateValue === id ? 'active' : ''}`} >{name}</p>
        )
    }

    randomVal = (array) => array[Math.floor(Math.random() * array.length)];

    onChangeColor = function (type,color) {
        // console.log(e,type)
        // console.log(type,color)
        // console.log(type.hex)   
        // this.setState({[type] : color}, () => this.updateAvatarinState())
        this.updateAvatarinState({[type] : color})
    }

    toggleColorPicker = (e) => {
        const target = e.target.id
        this.setState({[target] : !(this.state[target])}, () => console.log(this.state))
    }

    closeColorPicker = (e) => {
        // console.log(e)
        if((this.state.openHairColorPicker || this.state.openShirtColorPicker || this.state.openFaceColorPicker)){
            if(e.type === 'click' && !(e.target.className.includes('react-colorful'))){
                console.log('closing all color pickers')
                this.setState({openHairColorPicker: false, openShirtColorPicker: false, openFaceColorPicker : false})
            }
        }
    }

    handleBlur = (e) => {
        console.log('blur')
    }

    randomVal   = (array) => array[Math.floor(Math.random() * array.length)];
    // https://stackoverflow.com/a/5092872
    randomColor = () => "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    generateRandomAvatar = (callType = '') => {
        if(this.state.showRandomStylesTooltip && callType !== 'init') {
            this.setState({showRandomStylesTooltip : false})
        }
        console.log(this.randomVal(this.styleOpts.faceColor))
        this.updateAvatarinState({
            isPlaceholder : false,
            sex : this.randomVal(this.styleOpts.sex),
            faceColor : this.randomVal(Object.keys(this.styleOpts.faceColor)),
            earSize : this.randomVal(this.styleOpts.earSize),
            hairColor : this.randomColor(),
            hairStyle : this.randomVal(Object.keys(this.styleOpts.hairStyle)),
            eyeStyle : this.randomVal(this.styleOpts.eyeStyle),
            glassesStyle : this.randomVal(this.styleOpts.glassesStyle),
            noseStyle : this.randomVal(this.styleOpts.noseStyle),
            mouthStyle : this.randomVal(this.styleOpts.mouthStyle),
            shirtStyle : this.randomVal(this.styleOpts.shirtStyle),
            shirtColor : this.randomColor(),
        })
    }

    componentDidMount() {
        if(this.props.avatar.isPlaceholder === true){
            this.generateRandomAvatar('init')
        }
    }

    render() {
        // console.log(this.styleOpts.sex)
        var AVTR = {} 
        for (const [key, value] of Object.entries(this.props.avatar)) {
            // console.log(key)
            // console.log(this.props.avatar[key])
            AVTR[key] = value
          }

        const {openHairColorPicker,
            openShirtColorPicker,openFaceColorPicker,showRandomStylesTooltip} = this.state
        return (
            <div className='custom-avatar-scaffold'>
                <div className='custom-avatar-container no-select'>
                    {
                        (showRandomStylesTooltip) ? (<p style={{textAlign : 'center',fontSize:'13px'}}>Click avatar to generate random styles</p>) : null
                    }    
                    <div className='avatar' onClick={this.generateRandomAvatar}>
                        <Avatar  style={{ width: '8rem', height: '8rem' }} 
                             {...AVTR} bgColor='transparent'/>
                    </div>
                    <div className="info" onClick={this.closeColorPicker}>
                        {/* <AvatarAttribute title='SEX' id='sex' styleOpts={this.styleOpts['sex']} stateValue={sex} onClick={this.handleClick}/> */}
                        <AvatarAttribute title='FACE' id='faceColor' styleOpts={Object.keys(this.styleOpts.faceColor)} optsObj={this.styleOpts.faceColor} stateValue={AVTR.faceColor} onClick={this.handleClick}
                            pickerID = 'openFaceColorPicker' onPickerClick={this.toggleColorPicker} pickerType={openFaceColorPicker} colorValue={AVTR.faceColor} onColorChange={this.onChangeColor.bind(this,'faceColor')}
                        />
                        <AvatarAttribute title='HAIR' id='hairStyle' styleOpts={Object.keys(this.styleOpts.hairStyle)} optsObj={this.styleOpts.hairStyle} stateValue={AVTR.hairStyle} onClick={this.handleClick}
                            pickerID = 'openHairColorPicker' onPickerClick={this.toggleColorPicker} pickerType={openHairColorPicker} colorValue={AVTR.hairColor} onColorChange={this.onChangeColor.bind(this,'hairColor')}
                        />
                        <AvatarAttribute title='EYES' id='eyeStyle' styleOpts={this.styleOpts['eyeStyle']} stateValue={AVTR.eyeStyle} onClick={this.handleClick}/>
                        <AvatarAttribute title='GLASSES' id='glassesStyle' styleOpts={this.styleOpts['glassesStyle']} stateValue={AVTR.glassesStyle} onClick={this.handleClick}/>
                        <AvatarAttribute title='EAR' id='earSize' styleOpts={this.styleOpts['earSize']} stateValue={AVTR.earSize} onClick={this.handleClick}/>
                        <AvatarAttribute title='NOSE' id='noseStyle' styleOpts={this.styleOpts['noseStyle']} stateValue={AVTR.noseStyle} onClick={this.handleClick}/>
                        <AvatarAttribute title='MOUTH' id='mouthStyle' styleOpts={this.styleOpts['mouthStyle']} stateValue={AVTR.mouthStyle} onClick={this.handleClick}/>
                        <AvatarAttribute title='SHIRT' id='shirtStyle' styleOpts={this.styleOpts['shirtStyle']} stateValue={AVTR.shirtStyle} onClick={this.handleClick}
                            pickerID = 'openShirtColorPicker' onPickerClick={this.toggleColorPicker} pickerType={openShirtColorPicker} colorValue={AVTR.shirtColor} onColorChange={this.onChangeColor.bind(this,'shirtColor')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        avatar : state.avatar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAvatarAction : (avatarStyle) => dispatch(updateAvatar(avatarStyle))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomAvatar)
