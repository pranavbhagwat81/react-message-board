export const updateAvatar = (avatarStyle) => {
    return (dispatch, getState) => {
        dispatch({ type : "UPDATE_AVATAR", avatarStyle })
    }
}
