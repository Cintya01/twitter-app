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

      return (
        <div>
           <h1>Tweets:</h1>
            {props.tweets.map((tweet) => {
               return (
                <div key={tweet.id}>
                  <h1>{tweet.tweet}</h1>
                  <h4>por: {tweet.autor}</h4>
                </div>
              );
            })}
        </div>
      );
}

export default Twitter;