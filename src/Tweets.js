import './App.css';
import {firestore} from './firebase';
import React, {useEffect} from 'react';


function Twitter(props) {
    
    useEffect (() => {
        firestore
        .collection("Tweets-s4")
        .get()
        .then ((snapshot) => {
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

      return (
        <div>
            <div className="form-cont flex">
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
         <div className="tweet-cont flex">   
            {props.tweets.map((tweet) => {
               return (                
                <div className="tweet-cont-ind" key={tweet.id}>
                  <p>{tweet.tweet}</p>
                  <span>por: {tweet.autor}</span>
                </div>
              );
            })}
            </div>
        </div>
      );
}

export default Twitter;