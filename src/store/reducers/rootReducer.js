import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import messagesReducer from './messagesReducer'
import avatarReducer from './avatarReducer'
import storeReducer from './storeReducer'


const rootReducer = combineReducers({
    messages : messagesReducer,
    avatar   : avatarReducer,
    store : storeReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer