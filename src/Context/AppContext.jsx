import React, {useState, useEffect, createContext} from 'react';
import {firestore, auth} from '../firebase.js';

export const AppFirebaseContext = createContext();

export default function FirebaseProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false); 
    const [nickName, setNickName] = useState("");
// const [msn, setMsn] = useState ([]);
// const [tweet, setTweet] = useState({  autor: "",
//   tweet: "",
//   dateCreated: "",
//   likes: 0,
//   userId: "",
//   email: ""});

      
useEffect(() => {  
    auth.onAuthStateChanged((user) => {
    if(!user) return;
    setAuthenticated(true);
    firestore.collection("Users-s4").doc(user.uid).get().then((docRef) => {
        //si usr existe, obtener datos y meterlos al props
        if(docRef.exists){
             // console.log("firestoreDocs",docRef.data());
             let data = docRef.data();
             setUser(data);
        }else{
            //usr no existe, guardar datos en firebase y luego setear en props.
         let userObject = {
             email:user.email,
             uid:user.uid,
             name:user.displayName,
             photoURL: user.photoURL,
             nickName: nickName
         }
         //guardar user, pass, uid
         firestore.collection("Users-s4").doc(userObject.uid).set(userObject,{merge:true}).then((docRef)=>{
            setUser(userObject);
         })
        }

        
    })

 });
  // eslint-disable-next-line 
}, [])

const changeUsername = (e) => {
 setNickName(e.target.value);

 firestore.collection("Users-s4").doc(user.uid).set(
     {photoURL: user.photoURL,
         name: user.name,                       
     uid : user.uid,
     email : user.email,
     nickName: nickName})
}



return (
    <AppFirebaseContext.Provider value= {{user, setUser, authenticated, setAuthenticated, changeUsername}} >
        {children}
    </AppFirebaseContext.Provider>
);
}
