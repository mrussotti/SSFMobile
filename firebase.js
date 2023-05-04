// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmZXeE1z2SyarjF7mcEVgM2opbYkcRXEQ",
  authDomain: "summit-street-fitness.firebaseapp.com",
  projectId: "summit-street-fitness",
  storageBucket: "summit-street-fitness.appspot.com",
  messagingSenderId: "1074282733918",
  appId: "1:1074282733918:web:effde375203d210c2fafcf",
  measurementId: "G-7LRHCCNQTY"
};

// Initialize Firebase
let app;
if (firebase.apps.length ===0){
    app=firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app()
}

const auth = firebase.auth()
export { auth };