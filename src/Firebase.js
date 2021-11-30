import firebase from 'firebase/app'
import 'firebase/firestore'

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
// exporta el paquete de firebase para poder usarlo
export default firebase
