import '../src/Styles/App.css';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import ProfilePic from "../src/Resources/svg/ornacia.png"
import logo from "../src/Resources/svg/Logo_Alone.svg" 
import name from "../src/Resources/svg/Name_Logo.svg"
import heartred from "../src/Resources/svg/heart_red.svg"
import heartwhite from "../src/Resources/svg/heart_white.svg"

function Twitter() {

    const {user, tweets, setTweet, sendTweet, deleteTweet,likeTweet, tweet} = useContext(AppFirebaseContext);
    

    let navigate = useNavigate();

    function handleClick() {        
        var element = document.getElementById("myID");
        element.style.backgroundColor=user.colorPick.value;
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
        {user.photoURL === "" ?
                             <img className="profile-img-header" src={""} alt="profile pic" onClick={handleClick}  />
                             :  <img className="profile-img-header" src={user.photoURL} alt="profile pic" onClick={handleClick} /> }
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

                <div className='max flex'>200 max.</div>
                <div className='flex max'>                
                    <button className="btn-post silk-font" onClick={sendTweet}> POST </button>
                    </div>
                </form>
            </div>

            <section className="tweet-cont flex">  

            {tweets.map((tweet) => {


        //DA FORMATO A LA FECHA DE FIREBASE PARA MOSTRARLA EN FORMATO LOCAL
        const format = (dates, locale, options) =>
                new Intl.DateTimeFormat(locale,options).format(dates)
        let date = tweet.dateCreated.toDate() 

        const posted = format(date,'es', { day: 'numeric', month: 'short' });
        
                        
                      


               return (   
                             
                    <div className="tweet-cont-ind flex" key={tweet.id}>
                        <div className="photo-space">
                            {tweet.photoURL === "" ?
                             <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
                             :  <img className="profile-img" src={tweet.photoURL} alt="profile pic"/> }
                        </div>
                         <div className="text-cont"> 
                         <div className="user-date flex">                       
                            <p id="myID" className="username" onClick={handleClick}>{tweet.autor}</p>       
                            <span>  -{posted}.</span>
                            </div>
                        
                            {tweet.userId === user.uid ?
                            <span onClick={() => deleteTweet(tweet.id)} className='delete flex'>
                                <img className="svg-delete flex" src={borrar} alt="delete"/>
                            </span> : null
                            }
                            
                        

                       
                        <div className='flex tweet-space'>
                            <p>{tweet.tweet}</p>
                        </div>
                    <div>
            
                        {tweet.userId !== user.uid ?
                        
                        <span onClick={() => likeTweet(tweet.id, tweet.likes)} className="flex" >
                        <img className='heart' src={heartred} alt="" />
                        <span className='likes flex'>{tweet.likes ? tweet.likes : 0}    </span>
                        </span>
                        : 
                        <span className='flex'>
                        <img className='heart flex' src={heartwhite} alt="" />
                        <span className='likes flex'>{tweet.likes}    </span>
                        </span>
                        }
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