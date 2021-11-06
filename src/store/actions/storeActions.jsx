const updateAuth = (authStatus) => {
    return (dispatch, getState) => {
        dispatch({ type : "UPDATE_AUTH", authStatus })
    }
}

const updateWelcomeDisplayedOnce = (welcomeStatus) => {
    return (dispatch, getState) => {
        dispatch({ type : "UPDATE_WELCOME", welcomeStatus })
    }
}


export {
    updateAuth,
    updateWelcomeDisplayedOnce
}