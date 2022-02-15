import React, {useState, useEffect, createContext} from 'react';
import {firestore, auth} from '../Firebase.js';
import defaultPhoto from "../Resources/svg/profilePicDefault.svg";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const AppFirebaseContext = createContext();

export default function FirebaseProvider({ children }) {

    const [loading, setLoading] =useState(false)
    const [favoritesFeed, setFavoriteFeed] = useState([]);
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false); 
    const [nickName, setNickName] = useState("");
    const [selectedOtherUser,setSelectedOtherUser] = useState({})
    const [colorPick, setColorPick] = useState(undefined);
    const [tweets, setTweets] = useState ([]); 
    const [tweet, setTweet] = useState({  
        autor: "",
        tweet: "",
        dateCreated: "",
        likes: 0,
        userId: "",
        email: "",
        photoURL: "",
        colorPick: ""});

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
                        colorPick: doc.data().colorPick,
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
                    tweet.dateCreated = new Date();
                    tweet.userId = user.uid;
                    tweet.email = user.email;
                    tweet.colorPick = user.colorPick;
                
            firestore.collection("Tweets-s4").add(tweet)
            setTweet({  autor: "",
                        tweet: "",
                        dateCreated: "",
                        likes: 0,
                        userId: "",
                        email: "",
                        colorPick:""});
    
            };
    
            const deleteTweet = (id) => {
                const newTweet = tweets.filter((tweet) => {
                    return tweet.id !== id;
                });
                setTweet(newTweet);
                firestore.collection("Tweets-s4").doc(id).delete()
            };

            const showDeletePopUp = (id) => {
                confirmAlert({
                  title: 'Está seguro de borrar el tweet?',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => deleteTweet(id)
                    },
                    {
                      label: 'No',
                      onClick: () => {}
                    }
                  ]
                });
              };

            //Envía Id de tweet e Id Usuario a Firestore Collection.

            let likeTweet = ( userId, tweetId) => {
                let like = {
                    tweetId: tweetId,
                    userId: userId
                };
            firestore.collection("FavoriteTweet").add(like)    
            };

              //Trae data de usuario e id de Favorites Feed

              useEffect (() => {  
                const unsuscribe = firestore
                .collection("FavoriteTweet")
                .onSnapshot((snapshot) => {
                   const fav = snapshot.docs.map((doc) => {
                        return {
                            tweetId:doc.data().tweetId,
                            userId:doc.data().userId
                        };
                    });
                     setFavoriteFeed(fav);
                  });
                  return () => unsuscribe();
                // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);  


                  //filtrar tweets por el id de tweet y los asigna como contador al usuario
        function countFavorites(tweetID){
            let filteredList = favoritesFeed.filter((element) => element.tweetId === tweetID ); 
            return filteredList.length
        };

        // filtra los tweets por el user del tweet y obtiene el uid del usuario que dio Like
        function FavoritesPerUser (userID) {
            let userFavs = favoritesFeed.filter((element) => element.userId === userID);
            return userFavs.lenght            
            }

           


          
              
// Si userID es igual a user.uid, entonces trae los tweets con ese userID        
      
             const getUserPhoto = (user)=>{
                if(user && user.photoURL){
                    return user.photoURL
                }else{
                    return defaultPhoto
                }
            }

            const getUserNick = (user)=>{
                if(user && user.nickName){
                    return user.nickName
                }else{
                    return "Username"
                }
            }

            const getUserByID  = (userId)=>{
                firestore.collection("Users-s4").doc(userId).get().then((docRef) => {
                    //si user existe, obtener datos
                    if(docRef.exists){
                         let data = docRef.data();
                         setSelectedOtherUser(data);
                         return data;
                    }else{
                    //Si user no existe lo setea como null
                        setSelectedOtherUser(null)
                        return null;
                    };        
                });
            }



return (
    <AppFirebaseContext.Provider value= {
        {user, 
        setUser, 
        authenticated, 
        setAuthenticated, 
        changeUsername,
        sendTweet, 
        showDeletePopUp,
        likeTweet, 
        tweet, 
        setTweet, 
        tweets, 
        setTweets,
        setColorPick,
        colorPick,
        getUserPhoto,
        getUserNick,    
        loading,
        setLoading,
        selectedOtherUser,
        setSelectedOtherUser,
        getUserByID,
        setFavoriteFeed,
        favoritesFeed,
        countFavorites,
        FavoritesPerUser,
      
        }} >
        {children}
    </AppFirebaseContext.Provider>
);
}
