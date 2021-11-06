import React from 'react'
import Avatar from 'react-nice-avatar'
import moment from 'moment'
import './post.scss'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import approveIcon from '../../assets/approve.svg'
import deleteIcon from '../../assets/delete.svg'
import { connect } from 'react-redux'
import { approveMessage } from '../../store/actions/messageActions'
import { deleteMessage } from '../../store/actions/messageActions'


const isBlank = (str) => { 
    return (!str || str.length <= 0 ||  str.trim() === '')
}

const handleApprovePost = (e,msg, approveMessageAction) => {
    console.log(`approving post from ${msg.user} (${msg.id})`)
    approveMessageAction(msg)
}

const handleDeletePost = (e,msg, deleteMessageAction) => {
    console.log(`deleting post from ${msg.user} (${msg.id})`)
    deleteMessageAction(msg)
}

const Post = (props) => {
    // console.log(props)
    const {user,avatar,message,date,media,id,approved} = props.message
    console.log(id)
    return (
        <div className="post">
            <div className="post-line"></div>
            <Avatar  style={{ width: '90px', height: '90px', minWidth : '90px', minHeight : '90px', marginLeft:'10px' }} {...avatar} bgColor='transparent'/>
            {/* <div className="post-avatar"> */}
            {/* </div> */}
            <div className="post-content">
                <div className="post-header">
                    <div className="post-title no-select"><p>{user}</p></div>
                    {
                        props.isAuth? 
                            <div className="post-mod-actions">
                                {
                                    approved ? null : 
                                        <img src={approveIcon} onClick={e => handleApprovePost(e,props.message,props.approveMessageAction)} className='post-icon-approve' alt="Approve Post" />
                                }
                                <img src={deleteIcon} onClick={e => handleDeletePost(e,props.message, props.deleteMessageAction)} className='post-icon-delete' alt="Delete Post" />
                            </div> : null
                    }
                </div>
                <div className="post-message user-selectable">{message}</div>
                {
                    isBlank(media) ? null : 
                    <div className="post-media">
                        <Zoom>
                            <img src={media} alt='Link broken :/'/> 
                        </Zoom>
                    </div>
                }
                <div className="post-time"><p>-{moment(date).calendar()}</p></div>
            </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        approveMessageAction : (messagePayload) => dispatch(approveMessage(messagePayload)),
        deleteMessageAction  : (messagePayload) => dispatch(deleteMessage(messagePayload))
    }
}

export default  connect(null, mapDispatchToProps)(Post)
