import '../src/Styles/App.css';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import ProfilePic from "../src/Resources/svg/ornacia.png"
import logo from "../src/Resources/svg/Logo_Alone.svg"
import name from "../src/Resources/svg/Name_Logo.svg"
import heart from "../src/Resources/svg/heart.svg"

function Twitter() {

    const {user, tweets, setTweet, sendTweet, deleteTweet,likeTweet, tweet} = useContext(AppFirebaseContext)

    let navigate = useNavigate();

    function handleClick() {        
        navigate("/UserMainPage");        
    }

    const handleChange = (e) =>{
        let newTweet = {
            ...tweet,
            [e.target.name]: e.target.value
        };
        setTweet(newTweet);
    };
  

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
                        value= {tweet.tweet}
                        cols="30"
                        rows= "4"
                        placeholder="What's Happening?..."
                        maxLength="200"
                />
                <div>200 max.</div>
                <div>                
                    <button className="btn-post silk-font" onClick={sendTweet}> POST </button>
                    </div>
                </form>
            </div>

            <section className="tweet-cont flex">  

            {tweets.map((tweet) => {

                let date = tweet.dateCreated.toDate().toLocaleDateString();

               return (   
                             
                    <div className="tweet-cont-ind flex" key={tweet.id}>
                        <div className="photo-space">
                            {tweet.photoURL === "" ?
                             <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
                             :  <img className="profile-img" src={tweet.photoURL} alt="profile pic"/> }
                        </div>
                        <div className="text-cont">
                        <div className="first-row">
                            <p className="username" onClick={handleClick}>{tweet.autor}</p>
                            <span>- {date} .</span>
                        
                            {tweet.userId === user.uid ?
                            <span onClick={() => deleteTweet(tweet.id)} className="delete">
                                <img className="svg-delete" src={borrar} alt="delete"/>
                            </span> : null
                            }
                        </div>

                       
                        <div className='flex tweet-space'>
                            <p>{tweet.tweet}</p>
                        </div>
                    <div>
            
                        {tweet.userId !== user.uid ?
                        
                        <span onClick={() => likeTweet(tweet.id, tweet.likes)} className="likes" >
                        <img height="13px" src={heart} alt="" />
                        <span>{tweet.likes ? tweet.likes : 0}    </span>
                        </span>
                        : null}
                         <p className="email-text">{tweet.email}</p>
                    </div>
                    </div>
                    </div>
              );
            })}
            </section>
            
           
        </div>
      );
}

export default Twitter;