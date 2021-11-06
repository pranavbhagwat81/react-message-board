import React, { Component } from 'react'
import './UserInfo.scss'
import { uploadMessage } from '../../store/actions/messageActions'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton';
import {toast} from 'react-toastify'
import ReactGiphySearchbox from 'react-giphy-searchbox'
import gifSVG from '../../assets/gif.svg'
import gifSVGClicked from '../../assets/gif-clicked.svg'

class UserInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            message : '',
            media : '',
            infoFilled : false,
            gifToggle : false
        }
        // this.info = {
        //     name : '',
        //     message : '',
        //     infoFilled : false,
        // }
    }

    isBlank(str) { 
        return (!str || str.length <= 0 ||  str.trim() === '')
    }

    handleSubmitState = () => {
        const {name,message,infoFilled} = this.state
        // console.log(this.state)

        // console.log(!(this.isBlank(name)) , !(this.isBlank(message)) , !infoFilled)
        if(!(this.isBlank(name)) && !(this.isBlank(message)) &&  !infoFilled){
            this.setState({infoFilled : true})
        }else if ( (this.isBlank(name) || (this.isBlank(message))) && infoFilled){
            this.setState({infoFilled : false})
        }
    }

    handleInput(type,e){
        // console.log(e.target.value)
        // console.log(type)
        
        // this.state[type] = e.target.value
        this.setState({ [type] : e.target.value },() => this.handleSubmitState())
    }

    submitDataToFireStore = () => {
        const {name, message, media} = this.state
        this.props.uploadMessageAction({user: name, message : message,media: media, 
                                            avatar: this.props.avatar,approved: false,date: Date.now()})
        console.log('message sent')
        this.setState({infoFilled : false,message:'',media : ''})
        localStorage.setItem('username', name)
    }

    handleSubmit = async () => {
        const {media, infoFilled} = this.state
        this.setState({infoFilled: false})
        if(infoFilled){
            // toast.info('Message is being submitted',{autoClose : 2500})
            if(this.isBlank(media)){
                this.submitDataToFireStore()
            }else{
                // https://stackoverflow.com/a/55880263   
                var image = new Image();
                image.onload = () => {
                  if (image.width > 0) {
                    console.log("image exists");
                    this.submitDataToFireStore()
                  }
                }
                image.onerror = () => {
                  console.log("image doesn't exist");
                  toast.error('Please post a valid media link',{autoClose : 6000})
                  this.setState({media : ''})
                  this.handleSubmitState()
                }
                image.src = media;
            }
        }
    }

    componentDidMount() {
        if(localStorage.getItem('username')){
            this.setState({name : localStorage.getItem('username')})
        }
    }

    handleGIFSelect = (gif) => {

        console.log(gif)
        this.setState({media : gif.images.fixed_height.url}, () => this.setState({gifToggle : false}))
    }


    handleGIFBlur = () => {
        console.log('blurred')
        setTimeout(() => this.setState({gifToggle : false}), 200)
        // 
    }

    handleGIFToggle= () => {
        this.setState({gifToggle : !this.state.gifToggle})
    }


    render() {
        const { name,message,media,infoFilled,gifToggle} = this.state
        return (
            <div className='name-message-scaffold'>
                <div className="name-message-container">
                    {/* <form onSubmit={this.handleSubmit}> */}
                        <label  htmlFor='input-name'> <span>Name</span><span>*</span></label>
                        <input type="text" value={name} maxLength="30"  id='input-name' className="form-input user-selectable" onChange={this.handleInput.bind(this,'name')}></input>
                        
                        <label  htmlFor='input-media'> <p>Image Link</p></label>
                        <div className='input-container'>
                            <div className='giphy-container' onBlur = {this.handleGIFBlur}>
                                {
                                    gifToggle ? <ReactGiphySearchbox
                                                apiKey="5qq9RvhQDJlcqQcoUxtFdcaK3OpqKPGE" 
                                                onSelect={this.handleGIFSelect}
                                                wrapperClassName = 'giphy-container'
                                                autoFocus = {true}
                                                rating = 'r'
                                            /> : null
                                }
                                
                            </div>
                            <input type="text" value={media} id='input-media' className="form-input user-selectable" onChange={this.handleInput.bind(this,'media')}></input>
                            <div id='gif-toggle' onClick={this.handleGIFToggle}>
                                <img  src={gifToggle? gifSVGClicked : gifSVG} alt="GIF" />
                            </div>
                        </div>
                        <label htmlFor='input-message'><span>Message</span><span>*</span></label>
                        <textarea id='input-message' value={message} maxLength="160" className="form-input user-selectable" onChange={this.handleInput.bind(this,'message')}></textarea>
                        <div className='button-container no-select'>
                            {/* <div className='neu-button' onClick={this.handleSubmit}>Submit</div> */}
                            <SubmitButton onClick={this.handleSubmit} infoFilled={infoFilled}/>
                        </div>
                    {/* </form> */}
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
        uploadMessageAction : (messagePayload) => dispatch(uploadMessage(messagePayload))
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
