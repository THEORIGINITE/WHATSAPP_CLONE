import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCbdyNr0ENJbQHT6zpe1qOU1Pj8G4vDCkw",
  authDomain: "by-bittu.firebaseapp.com",
  projectId: "by-bittu",
  storageBucket: "by-bittu.appspot.com",
  messagingSenderId: "393945440962",
  appId: "1:393945440962:web:08f337db99fb9b3fb0515b",
  measurementId: "G-PMFBFY351W"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const storage =  firebase.storage()
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export { auth, provider,storage};
export default db;