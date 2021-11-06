// const initState = {
//             sex: 'man',faceColor : '#F9C9B6',earSize : 'small',hairColor : 'lemonchiffon',hairStyle : 'thick',eyeStyle : 'smile',
//                 glassesStyle : 'round',noseStyle : 'short',mouthStyle : 'smile',shirtStyle : 'hoody',shirtColor : 'turquoise',
// } 

const avatarHistory = localStorage.getItem('AVATAR')
const initState = avatarHistory ? JSON.parse(avatarHistory) : {isPlaceholder : true, hairColorRandom:true}

const avatarReducer = (state = initState,action) => {
    switch(action.type){
        case 'UPDATE_AVATAR' : 
            const newAvatar = {...state, ...action.avatarStyle } 
            console.log('update avatar' , newAvatar)
            localStorage.setItem('AVATAR', JSON.stringify(newAvatar))
            return newAvatar
        default: 
            // console.log('uncaught switch case')
    }
    return state
}

export default avatarReducer