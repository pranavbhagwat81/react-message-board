import React from 'react'
import './navbar.scss'
import './signedInLinks.scss'
import { NavLink, useLocation } from 'react-router-dom'
import Avatar from 'react-nice-avatar'
import { connect } from 'react-redux'
import drawIcon from '../../assets/draw.svg'


const SignedInLinks = (props) => {

    const location = useLocation();
    // console.log(location.pathname);

        return (
            <div className='signed-in-scaffold navlinks'>
                <div className='neulink navtext'>
                    {/* <img src={postIcon} alt="" /> */}
                    { location.pathname !== '/add' &&  props.avatar.isPlaceholder? 
                            <NavLink to='/add'>
                                <div id="goto-avatar">
                                    <img src={drawIcon} alt="New Post" />
                                    </div>    
                            </NavLink>  
                            : null
                            
                    }
                    {/* { location.pathname === '/add' ? 
                            <NavLink to='/'>Back to Dashboard</NavLink> : null
                    } */}
                </div>
                    {!(props.avatar.isPlaceholder) ? 
                        <NavLink to={location.pathname !== '/add' ? '/add' : '/'}>
                            <Avatar className='avatar-link' style={{ width: '50px', height: '50px' }} 
                            {...props.avatar} bgColor='transparent'/>
                        </NavLink>
                                : null}
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        avatar : state.avatar
    }
}

export default connect(mapStateToProps)(SignedInLinks)