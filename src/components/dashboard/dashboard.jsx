import React from 'react'
import Post from './post'
import './dashboard.scss'
import {toast} from 'react-toastify'
import { connect } from 'react-redux'

var dateNow = Date.now()

const isNewMsg = (message) => {
  if(message.date > dateNow && localStorage.getItem('username') !== message.user ){
    console.log('NEW POST')
    console.log(message)
    toast.info(`New message from ${message.user}!`,{autoClose : 6000})
    dateNow = Date.now()
  }
}



class Dashboard extends React.Component {
        // constructor(props){
        //   super(props)
        // }
 
        componentDidUpdate() {  
          const messages = this.props.messages
          if(messages && messages.length > 0){
            isNewMsg(messages[0])
          }
        }

        shouldComponentUpdate(nextProps, nextState){
          console.log('should update?')
          console.log(nextProps)
          return true
        }


        render() {
          // console.log(this.props)
          const {messages,isAuth} = this.props
          console.log(messages)
          return (
              <div className='dashboard-scaffold'>
                <div className='dashboard-posts hide-scrollbar'>
                    <div className="dashboard">
                        { messages && messages.map((message,index) => (
                            <Post key={message.id} message={message} isAuth={isAuth}/>
                        ))}
                    </div>
                </div>
              </div> 
            
          );
        }
}

const mapStateToProps = (state) => {
  console.log(state)
  // console.log(state.firestore);
  const messages = state.firestore.ordered.messages;
  const isAuth     = state.store.isAuth
  // console.log(messages)
  return {
    messages,
    isAuth
  };
};

export default connect(mapStateToProps)(Dashboard)
