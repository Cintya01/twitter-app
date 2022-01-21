import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBSANceXG3slD35JE30Wjk0Qvsb-Tj2oyY",
  authDomain: "proyecto-s4-acamica.firebaseapp.com",
  projectId: "proyecto-s4-acamica",
  storageBucket: "proyecto-s4-acamica.appspot.com",
  messagingSenderId: "796262028821",
  appId: "1:796262028821:web:3c8ad69cc39a58798e201c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore()

//el módulo de autenticación
export const auth = firebase.auth();
//el proveedor de auth
export const provider = new firebase.auth.GoogleAuthProvider();
//la utilidad para hacer login con el pop-up
export const loginConGoogle= () => auth.signInWithPopup(provider);
//la utilidad para hacer logout
export const logout = () => auth.signOut();
// exporta el paquete de firebase para poder usarlo
export default firebase
