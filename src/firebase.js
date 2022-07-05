import {firebase} from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyC62awI62GpAYbB6jv3o196OacSn3x3I5Q",
    authDomain: "todolist-react-bff68.firebaseapp.com",
    databaseURL: "https://todolist-react-bff68-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todolist-react-bff68",
    storageBucket: "todolist-react-bff68.appspot.com",
    messagingSenderId: "292726464823",
    appId: "1:292726464823:web:c7b2151338dc8c61757ab2"
});


export { firebaseConfig as firebase};