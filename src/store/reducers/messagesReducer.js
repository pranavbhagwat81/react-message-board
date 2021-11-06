const initState = {
    messageList : [
        {user:'Peter Parker', message:"This is a message", timestamp:'Sun May 11 2020'},
        {user:'Bruce Banner', message:"It do be like that sometimes", timestamp:'Sat April 22 2020'}
    ]
} 

const messagesReducer = (state = initState,action) => {
    switch(action.type){
        case 'UPLOAD_MESSAGE' : 
            console.log('uploaded message' , action.messagePayload)
            break;
        case 'UPLOAD_MESSAGE_ERROR' : 
            console.log('Upload Message Error' , action.err)
            break;
        case 'MOD_ACTION' : 
            console.log('Mod action successful' , action.subtype)
            break;
        case 'MOD_ACTION_ERROR' : 
            console.log('Mod action failed' , action.subtype, action.err)
            break;
        default: 
            // console.log('uncaught switch case')
    }
    return state
}

export default messagesReducer