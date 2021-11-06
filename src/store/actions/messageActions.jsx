import {toast} from 'react-toastify'

const uploadMessage = (messagePayload) => {
    return (dispatch, getState,{ getFirebase }) => {

        const firestore = getFirebase().firestore();
        firestore.collection('messages').add({
            ...messagePayload
        }).then((response) => {
            console.log(response.id)
            toast.success('Message sent!',{autoClose : 4000})
            dispatch({ type : "UPLOAD_MESSAGE", messagePayload })
        }).catch((err) => {
            dispatch({ type : "UPLOAD_MESSAGE_ERROR", err })
            toast.error(`Couldn't send message! Retry like an hour later.`,{autoClose : 6000})
        })
    }
}

const approveMessage = (messagePayload) => {
    return (dispatch, getState,{ getFirebase }) => {

        const firestore = getFirebase().firestore();
        firestore.collection('messages').doc(messagePayload.id).update({
            approved : true
        }).then(() => {
            // toast.success('Message approved!',{autoClose : 6000})
            dispatch({ type : "MOD_ACTION",subtype : 'APPROVE', messagePayload })
        }).catch((err) => {
            dispatch({ type : "MOD_ACTION_ERROR", subtype : 'APPROVE',  err })
            toast.error(`Couldn't approve message! Retry like an hour later.`,{autoClose : 6000})
        })
    }
}

const deleteMessage = (messagePayload) => {
    return (dispatch, getState,{ getFirebase }) => {

        const firestore = getFirebase().firestore();
        firestore.collection('messages').doc(messagePayload.id).delete().then(() => {
            // toast.success('Message deleted!',{autoClose : 6000})
            console.log('Message deleted')
            dispatch({ type : "MOD_ACTION",subtype : 'DELETE', messagePayload })
        }).catch((err) => {
            dispatch({ type : "MOD_ACTION_ERROR", subtype : 'DELETE',  err })
            toast.error(`Couldn't delete message! Retry like an hour later.`,{autoClose : 6000})
        })
    }
}


export {
    uploadMessage, 
    approveMessage,
    deleteMessage
}