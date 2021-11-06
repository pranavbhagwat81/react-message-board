import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCh1bWSSV6sGFc81yxcQHyVGxiAizRYz48",
    authDomain: "neu-board.firebaseapp.com",
    projectId: "neu-board",
    storageBucket: "neu-board.appspot.com",
    messagingSenderId: "668588047379",
    appId: "1:668588047379:web:f76373774d58ce532353e6"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots : true})

export default firebase
