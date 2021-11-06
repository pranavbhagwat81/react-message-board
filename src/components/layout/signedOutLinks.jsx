import React from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'

class signedOutLinks extends React.Component{
    
    render(){
        return <div className='signed-out-scaffold navlinks'>
            <div className='neulink navtext'><NavLink to='/'>Sign Up</NavLink></div>
            <div className='neulink navtext'><NavLink to='/'>Log In</NavLink></div>
            <div className='neulink navtext'><NavLink to='/'>Guest Login</NavLink></div>
        </div>
    }
}

export default signedOutLinks