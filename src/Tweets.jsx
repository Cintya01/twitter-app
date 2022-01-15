import '../src/Styles/App.css';
import {firestore} from './firebase';
import React, {useEffect} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import ProfilePic from "../src/Resources/svg/ornacia.png"
import logo from "../src/Resources/svg/Logo_Alone.svg"
import name from "../src/Resources/svg/Name_Logo.svg"
import heart from "../src/Resources/svg/heart.svg"

//Tercera pantalla//

function Twitter(props) {
    
    useEffect (() => {
        const unsuscribe = firestore
        .collection("Tweets-s4")
        .onSnapshot((snapshot) => {
           const tweets = snapshot.docs.map((doc) => {
                return {
                    tweet: doc.data().tweet,
                    autor: doc.data().autor,
                    id: doc.id,
                    likes: doc.data().likes
                };
            });
             props.setTweets(tweets);
          });
          return () => unsuscribe();
        },[])

        const handleChange = (e) =>{
            let newTweet = {
                ...props.tweet,
                [e.target.name]: e.target.value
            };
            props.setTweet(newTweet);
        };

        const sendTweet = (e) => {
            e.preventDefault();
        let sendTweet = firestore.collection("Tweets-s4").add(props.tweet)
        let documentSolicitude = sendTweet.then((docRef) => {
            return docRef.get();
        });
        documentSolicitude.then((doc) => {
            let newTweet ={
                tweet: doc.data().tweet,
                autor: doc.data().autor,
                id: doc.id
            };
            props.setTweet([newTweet,...props.tweets])
        })

        };

        const deleteTweet = (id) => {
            const newTweet = props.tweets.filter((tweet) => {
                return tweet.id !== id;
            });
            props.setTweet(newTweet);
            firestore.doc(`props.tweets/${id}`).delete();
        };

        const likeTweet = (id, likes) => {
            if (!likes) likes = 0;
            firestore.doc (`props.tweets/${id}`).update({likes: likes + 1});
        }

      return (
        <div>
            <div className="header-cont flex">
        <nav className="header-nav-cont flex">
            <img className="profile-img-header" src={ProfilePic} alt="Profile Pic"/>
            <img className="logo-cont-header" src={logo} alt="Logo"/>
            <img className="devs-header" src={name} alt="DEVSUNITED"/>
        </nav>
        </div>
            <div className="form-cont flex">
            <img className="profile-img" src={ProfilePic} alt="Profile Pic"/>
                <form>
                    <textarea
                        name="tweet"
                        onChange={handleChange}
                        value= {props.tweet.tweet}
                        cols="30"
                        rows= "5"
                        placeholder="What's Happening?..."
                />
                <div>
                    <input 
                        name="autor"
                        onChange={handleChange}
                        value= {props.tweet.autor}
                        type="text"
                        placeholder="persona autora"
                     />
                
                    <button className="btn-post silk-font" onClick={sendTweet}> POST </button>
                    </div>
                </form>
            </div>
          
            {props.tweets.map((tweet) => {
               return (   
                <div className="tweet-cont flex">               
                    <div className="tweet-cont-ind flex" key={tweet.id}>
                    <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
                        <p>{tweet.tweet}</p>
                        <p className="tweet-autor">por: {tweet.autor}</p>
                    <div className="acciones">
                        <span onClick={() => deleteTweet(props.tweets.id)} className="delete">
                            <img className="delete" src={borrar} alt="delete"/>
                        </span>
                        <span onClick={() => likeTweet(tweet.id, tweet.likes)} className="likes" >
                        <img height="13px" src={heart} alt="" />
                        <span>{tweet.likes ? tweet.likes : 0}    </span>
                        </span>


                    </div>
                    </div>
                 </div>
              );
            })}
            
           
        </div>
      );
}

export default Twitter;