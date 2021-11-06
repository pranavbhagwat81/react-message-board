import React, { Component } from 'react'
import Dashboard from './dashboard'
import Welcome from './Welcome'
import './Home.scss'
import { connect } from 'react-redux'


export class Home extends Component {
    render() {
        const {welcomeDisplayedOnce} = this.props
        console.log(welcomeDisplayedOnce)
        return (
            <div style={{display : 'flex'}}>
                    <div className="dashboard-god"> <Dashboard welcomeDisplayedOnce={welcomeDisplayedOnce}/> </div>
                     <div className="welcome-god"> <Welcome/> </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const welcomeDisplayedOnce  = state.store.welcomeDisplayedOnce
    return {
        welcomeDisplayedOnce
    };
  };
  

export default connect(mapStateToProps)(Home)