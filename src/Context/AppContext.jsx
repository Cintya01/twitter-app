import React, {useState, useEffect, createContext} from 'react';
import {firestore, auth} from '../firebase.js';
// import {useNavigate} from "react-router-dom";

export const AppFirebaseContext = createContext();

export default function FirebaseProvider({ children }) {


    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false); 
    const [nickName, setNickName] = useState("");
    const [colorPick, setColorPick] = useState(undefined);
    const [tweets, setTweets] = useState ([]); 
    const [tweet, setTweet] = useState({  
        autor: "",
        tweet: "",
        dateCreated: "",
        likes: 0,
        userId: "",
        email: ""});

  //   PARA AUTENTICAR AL USER Y GUARDAR SUS DATOS EN FIREBASE    
useEffect(() => {  
    auth.onAuthStateChanged((user) => {
    if(!user) return;
    setAuthenticated(true);
    firestore.collection("Users-s4").doc(user.uid).get().then((docRef) => {
        //si user existe, obtener datos
        if(docRef.exists){
             let data = docRef.data();
             setUser(data);
        }else{
        //Si user no existe, guardar datos en firebase y luego setear.
            let userObject = {
                email: user.email,
                uid: user.uid,
                name: user.displayName,
                photoURL: user.photoURL,
                // nickName: nickName,
                // color: colorPick,
            }
         //guardar datos de userObjetct
         firestore.collection("Users-s4").doc(userObject.uid).set(userObject,{merge:true}).then((docRef)=>{
            setUser(userObject);
         });
        };        
    });
 });
})

    const changeUsername = (e) => {
        setNickName(e.target.value);
    //Devuelve data con Nickname Incluido
        firestore.collection("Users-s4").doc(user.uid).set({
            photoURL: user.photoURL,
            name: user.name,                       
            uid : user.uid,
            email : user.email,
            nickName: nickName,
        })
        }

  //   OBTENER DATOS DE FIREBASE Y USER DATA
        useEffect (() => {

            // if(!user) {
            //     navigate("/");
            // }
            const unsuscribe = firestore
            .collection("Tweets-s4")
            .onSnapshot((snapshot) => {
               const tweets = snapshot.docs.map((doc) => {
                    return {
                        id:doc.id,
                        autor: doc.data().autor,
                        tweet: doc.data().tweet,
                        dateCreated: doc.data().dateCreated,
                        likes: doc.data().likes,
                        userId: doc.data().userId,
                        email: doc.data().email,
                        photoURL: doc.data().photoURL,
                        nickName: doc.data().nickName,
                        colorPick: doc.data().color,
                    };
                });
                 setTweets(tweets);
              });
              return () => unsuscribe();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[]);
    
    
        
    
            const sendTweet = (e) => {
                 e.preventDefault();
                    tweet.photoURL = user.photoURL;
                    tweet.autor  = user.nickName ? user.nickName : user.name;
                    // SI HAY PROPS USER NICKNAME MUESTRE SI NO, NAME ? : 
                    tweet.dateCreated = new Date();
                    tweet.userId = user.uid;
                    tweet.email = user.email;
                
            console.log(tweet)
            firestore.collection("Tweets-s4").add(tweet)
            setTweet({  autor: "",
                    tweet: "",
                    dateCreated: "",
                    likes: 0,
                    userId: "",
                    email: ""});
    
            };
    
            const deleteTweet = (id) => {
                const newTweet = tweets.filter((tweet) => {
                    return tweet.id !== id;
                });
                setTweet(newTweet);
                firestore.collection("Tweets-s4").doc(id).delete()
            };
    
            const likeTweet = (id, likes) => {
                if (!likes) likes = 0;
                firestore.doc (`Tweets-s4/${id}`).update({likes: likes + 1});
            }
      
            

return (
    <AppFirebaseContext.Provider value= {
        {user, 
        setUser, 
        authenticated, 
        setAuthenticated, 
        changeUsername,
        sendTweet, 
        deleteTweet, 
        likeTweet, 
        tweet, 
        setTweet, 
        tweets, 
        setTweets,
        
        setColorPick,
        colorPick,
        }} >
        {children}
    </AppFirebaseContext.Provider>
);
}
