import React, { Component } from 'react'
import {tryPassword} from '../../scripts/passwordScripts' 

export class AdminAuth extends Component {
    constructor(props){
        super(props)
        this.state = {
            password : ''
        }
    }

    
    handleInput = (e) => {
        this.setState({password : e.target.value})
    }

    handlePasswordSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        if(tryPassword(e.target.firstChild.value)) {
            this.props.onAuthenticated()
        }
        this.setState({password : ''})
    }
      

    render() {
        const {password} = this.state 
        const {isVisible} = this.props
        return  ( isVisible ?
                    <div>

                        <form onSubmit={ (e) => this.handlePasswordSubmit(e)}>
                        <input type="password" value={password} ref={(input) => { if(input) input.focus()}}  onChange={this.handleInput} placeholder='Enter Password'  
                            id='input-password' className="form-input user-selectable" onSubmit={this.handlePasswordSubmit}></input>
                        </form>
                    </div> : null
        )
    }
}

export default AdminAuth
