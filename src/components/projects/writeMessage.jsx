import React, { Component } from 'react'
import './writeMessage.scss'
import CustomAvatar from '../avatars/CustomAvatar'
import UserInfo from '../avatars/UserInfo'

class WriteMessage extends Component {
    render() {
        return (
            <div className='write-message-scaffold'>
                <CustomAvatar/>
                <UserInfo/>
            </div>
        )
    }
}

export default WriteMessage
