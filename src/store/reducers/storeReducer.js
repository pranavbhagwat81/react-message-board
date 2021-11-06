const initState = {
    isAuth : false,
    welcomeDisplayedOnce : false,
}

const authReducer = (state = initState,action) => {
    switch(action.type){
        case 'UPDATE_AUTH' : 
            console.log('update auth status' , action.authStatus,state)
            return {...state, ...action.authStatus}
        case 'UPDATE_WELCOME' : 
            console.log('update welcome status' , {...state, ...action.welcomeStatus })
            return {...state, ...action.welcomeStatus}
        default: 
            // console.log('uncaught switch case')
    }
    return state
}

export default authReducer