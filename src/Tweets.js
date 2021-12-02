import './App.css';
import {firestore} from './firebase';
import React, {useEffect} from 'react';
import borrar from "../src/svg/delete.svg";
import defaultPhoto from "../src/svg/profilePicDefault.svg";
import ProfilePic from "../src/svg/ornacia.png"
import logo from "../src/svg/Logo_Alone.svg"
import name from "../src/svg/Name_Logo.svg"

//Tercera pantalla//

function Twitter(props) {
    
    useEffect (() => {
        firestore
        .collection("Tweets-s4")
        .onSnapshot((snapshot) => {
           const tweets = snapshot.docs.map((doc) => {
                return {
                    tweet: doc.data().tweet,
                    autor: doc.data().autor,
                    id: doc.id
                };
            });
             props.setTweets(tweets);
             console.log(tweets);
          });
          // eslint-disable-next-line
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
                        <p>por: {tweet.autor}</p>
                    
                    <span onClick={() => deleteTweet(props.tweets.id)}>
                    <img className="delete" src={borrar} alt="delete"/>
                    </span>
                    </div>
                 </div>
              );
            })}
            
           
        </div>
      );
}

export default Twitter;