import '../src/Styles/App.css';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext} from 'react';
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import heartred from "../src/Resources/svg/heart_red.svg";
import heartwhite from "../src/Resources/svg/heart_white.svg";
import LogoutPic from "../src/Resources/svg/logout.svg" 
import back from "../src/Resources/svg/back.svg";
import {auth} from './Firebase.js';


function UserMainPageFav() {

    const {user, setAuthenticated, setUser, tweets,likeTweet, getUserPhoto, getUserNick, countFavorites, FavoritesPerUser} = useContext(AppFirebaseContext);

    let navigate = useNavigate();

    function handleClick() {        
        navigate("/Twitter");        
    }
    if(!user) {
        navigate("/");
    }

    function handlePost() {
        navigate("/UserMainPage")
    }

    
    let logout = () => {
        setAuthenticated(false);
        setUser(null);
        auth.signOut();
        navigate("/");
     }

    let getBgStyle = (colorHex)  => {
        return {
            backgroundColor:colorHex,
            boxShadow: '0 4px 0px -2px '+colorHex,
            width:'auto',
        }
    }
    let getBgPhotoStyle = (colorHex)  => {
        return {
            border: '4px solid' +colorHex
        }
    }

      return (
        <section>
            <div className="header-cont flex">
        <nav className="header-nav-cont space-around flex">
            <div className='flex center'>
        <img className="svg-usermainpage" src={back} onClick={handleClick} alt="Back" />
        <p className="silk-font" > {getUserNick(user)}  </p> 
        </div>
            
            <button className="logout-btn flex silk-font" onClick={logout}>Logout
            <img className="svg-usermainpage flex" src={LogoutPic} alt="LogOut" />
            </button>
        </nav>
        </div>
            <div className="form-cont">
            <img className="usermainpage" src={getUserPhoto(user)} style={getBgPhotoStyle(user.colorPick)} alt="Profile Pic"/>
            <div className='color-nickname center flex silk-font'>
            <p style={getBgStyle(user.colorPick)}> {getUserNick(user)}  </p> 
            </div>

          
               </div>
             <section>
                    <div className='flex center color'>       
                        <button type="button"  onClick={handlePost} className="btn-post-user silk-font"> POST</button>
                        <button type="button" className= "btn-post-user silk-font selected" >FAVORITES</button> 
                    </div>
             </section>
           
            <section className="tweet-cont flex">  


            
            
            {tweets.map((tweet) => {
               
               
               
        
        //DA FORMATO A LA FECHA DE FIREBASE PARA MOSTRARLA EN FORMATO LOCAL
        const format = (dates, locale, options) =>
                new Intl.DateTimeFormat(locale,options).format(dates)
        let date = tweet.dateCreated.toDate() 

    
        const posted = format(date,'es', { day: 'numeric', month: 'short' });  

                    
               return (   
               
                <div key={FavoritesPerUser(user.uid)}>
                    <div className="tweet-cont-ind flex" key={tweet.id} > 
                        <div className="photo-space">
                            {tweet.photoURL === "" ?
                             <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
                             :  <img className="profile-img" src={tweet.photoURL} alt="profile pic"/> }
                        </div>
                         <div className="text-cont"> 
                         <div className="user-date flex">                       
                            <p className="username" style={getBgStyle(tweet.colorPick)}>{tweet.autor}</p>       
                            <span>  -{posted}.</span>
                            </div>

                        <div className='flex tweet-space'>
                            <p>{tweet.tweet}</p>
                        </div>
                    <div>
            
                    {tweet.userId !== user.uid ?
                        
                        <span onClick={() => likeTweet(user.uid, tweet.id)} className="flex" >
                        <img className='heart' src={heartred} alt="" />
                        <span className='likes flex'>{countFavorites(tweet.id)}    </span>
                
                        </span>
                        : 
                        <span className='flex'>
                        <img className='heart flex' src={heartwhite} alt="" />
                        <span className='likes flex'>{countFavorites(tweet.id)}    </span>
                        </span>
                        }
                         <p className="email-text">{tweet.email}</p>
                    </div>
                    </div>
                </div>
                </div>
              );
            })} 
            </section>
            
           
        </section>
      );
}

export default UserMainPageFav;