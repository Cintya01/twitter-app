import '../src/Styles/App.css';
import {firestore} from './firebase';
import { useNavigate } from "react-router-dom";
import React, {useEffect} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import ProfilePic from "../src/Resources/svg/ornacia.png"
import logo from "../src/Resources/svg/Logo_Alone.svg"
import name from "../src/Resources/svg/Name_Logo.svg"
import heart from "../src/Resources/svg/heart.svg"

//Tercera pantalla//

function Twitter(props) {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/UserMainPage");
    }

    useEffect (() => {

        if(!props.user) {
            navigate("/");
        }
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
                props.tweet.autor  = props.user.userName;
                props.tweet.dateCreated = new Date();
                props.tweet.userId = props.user.uid;
                props.tweet.email = props.user.email;
        let sendTweet = firestore.collection("Tweets-s4").add(props.tweet)
        let documentSolicitude = sendTweet.then((docRef) => {
            return docRef.get();
        });
        documentSolicitude.then((doc) => {
                props.setTweets([props.tweet,...props.tweets])
                props.setTweet({  autor: "",
                tweet: "",
                dateCreated: "",
                likes: 0,
                userId: "",
                email: ""});
        });

        };

        const deleteTweet = (id) => {
            const newTweet = props.tweets.filter((tweet) => {
                return tweet.id !== id;
            });
            props.setTweet(newTweet);
            firestore.collection("Tweets-s4").doc(id).delete()
        };

        const likeTweet = (id, likes) => {
            if (!likes) likes = 0;
            firestore.doc (`Tweets-s4/${id}`).update({likes: likes + 1});
        }

      return (
        <div>
            <div className="header-cont flex">
        <nav className="header-nav-cont flex">
            <img className="profile-img-header" src={ProfilePic} alt="Profile Pic" onClick={handleClick}/>
            <img className="logo-cont-header" src={logo} alt="Logo"/>
            <img className="devs-header" src={name} alt="DEVSUNITED"/>
        </nav>
        </div>
            <div className="form-cont flex">
            <img className="profile-img" src={ProfilePic} alt="Profile Pic" onClick={handleClick}/>
                <form>
                    <textarea
                        name="tweet"
                        onChange={handleChange}
                        value= {props.tweet.tweet}
                        cols="30"
                        rows= "5"
                        placeholder="What's Happening?..."
                />
                <div>200 max</div>
                <div>
                    {/* <input 
                        name="autor"
                        onChange={handleChange}
                        value= {props.tweet.autor}
                        type="text"
                        placeholder="persona autora"
                     /> */}
                    
                    <button className="btn-post silk-font" onClick={sendTweet}> POST </button>
                    </div>
                </form>
            </div>

            <section className="tweet-cont flex">           
            {props.tweets.map((tweet) => {

                let date = tweet.dateCreated.toDate().toLocaleDateString();
                   

                                  
                // let formatDate = (date) => {
                //     try{
                //         if(date instanceof Date) return date;
                //         //si no es date, es fecha de Firebase y debe convertirse.
                //         return date.toDate().toLocaleDateString();
                //     }catch(e){
                //         console.log(e);
                //         return "";
                //     }
                // }
                

               return (   
                             
                    <div className="tweet-cont-ind flex" key={tweet.id}>
                        <div className="photo-space">
                             <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
                        </div>
                        <div className="first-row">
                            <p className="username" onClick={handleClick}>{tweet.autor}</p>
                            <span classname="date">/ {date}</span>
                        </div>
                        <div className='flex tweet-space'>
                            <p>{tweet.tweet}</p>
                        </div>
                    <div className="acciones">
                        {tweet.userId === props.user.uid ?
                        <span onClick={() => deleteTweet(tweet.id)} className="delete">
                            <img className="delete" src={borrar} alt="delete"/>
                        </span> : null
                        }
                        {tweet.userId !== props.user.uid ?
                        
                        <span onClick={() => likeTweet(tweet.id, tweet.likes)} className="likes" >
                        <img height="13px" src={heart} alt="" />
                        <span>{tweet.likes ? tweet.likes : 0}    </span>
                        <p className="username">{tweet.email}</p>
                        </span>
                        : null}
                    </div>
                    </div>
              );
            })}
            </section>
            
           
        </div>
      );
}

export default Twitter;