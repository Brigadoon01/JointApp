import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA5Z47R1_Qh6kjYl_mJwNgqIDgq3UtW_pA",
  authDomain: "jointer-app.firebaseapp.com",
  projectId: "jointer-app",
  storageBucket: "jointer-app.appspot.com",
  messagingSenderId: "285436944472",
  appId: "1:285436944472:web:da3254e9c24ccd0f4a2a2d"
};

//? initialize firebase
firebase.initializeApp(firebaseConfig);

//? initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage() 

//? timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
