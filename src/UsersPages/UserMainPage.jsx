import '../Styles/App.css';
import { AppFirebaseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext} from 'react';
import borrar from "../Resources/svg/delete.svg";
import defaultPhoto from "../Resources/svg/profilePicDefault.svg";
import heartred from "../Resources/svg/heart_red.svg";
import heartwhite from "../Resources/svg/heart_white.svg";
import LogoutPic from "../Resources/svg/logout.svg" 
import back from "../Resources/svg/back.svg";
import {auth} from '../Firebase';


function UserMainPage() {

    const {user, setAuthenticated, setUser, tweets, showDeletePopUp,likeTweet, getUserPhoto, getUserNick} = useContext(AppFirebaseContext);
    let navigate = useNavigate();

    function handleClick() {        
        navigate("/Twitter");        
    }

    function handleFav() {
        navigate("/UserMainPageFav")
    } if(!user) {
        navigate("/");
    };
    
    let logout = () => {
        setAuthenticated(false);
        setUser(null);
        auth.signOut();
        navigate("/");
    };

    let getBgStyle = (colorHex)  => {
        return {
            backgroundColor:colorHex,
            boxShadow: '0 4px 0px -2px '+colorHex,
            width:'auto',
        }
    };

    let getBgPhotoStyle = (colorHex)  => {
        return {
            border: '4px solid' +colorHex
        }
    };

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
                    <button type="button"  className= "btn-post-user silk-font selected"> POST</button>
                    <button type="button" onClick={handleFav} className= "btn-post-user silk-font" >FAVORITES</button> 
                </div>
            </section>
           
            <section className="tweet-cont flex">  

                
                {tweets.map((tweet) => { // eslint-disable-line array-callback-return
                    
                    if(tweet.userId === user.uid) {
                    //DA FORMATO A LA FECHA DE FIREBASE PARA MOSTRARLA EN FORMATO LOCAL
                    const format = (dates, locale, options) =>
                        new Intl.DateTimeFormat(locale,options).format(dates)
                    let date = tweet.dateCreated.toDate()
                    const posted = format(date,'es', { day: 'numeric', month: 'short' });  
                        
                      
                      
                    return (   
                                
                            <div className="tweet-cont-ind flex" key={tweet.id}>
                                <div className="photo-space">
                                    {tweet.photoURL === "" ?
                                        <img className="profile-img" src={defaultPhoto} alt="profile pic"/> :
                                        <img className="profile-img" src={tweet.photoURL} alt="profile pic"/> }
                                </div>
                                <div className="text-cont"> 
                                    <div className="user-date flex">                       
                                        <p className="username" style={getBgStyle(tweet.colorPick)}>{tweet.autor}</p>       
                                        <span>  -{posted}.</span>
                                    </div>
                                
                                    {tweet.userId === user.uid ?
                                        <span onClick={() => showDeletePopUp(tweet.id)} className='delete flex'>
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
                                                <span className='likes flex'>{tweet.likes ? tweet.likes : 0}</span>
                                            </span>
                                            : 
                                            <span className='flex'>
                                                <img className='heart flex' src={heartwhite} alt="" />
                                                <span className='likes flex'>{tweet.likes}</span>
                                            </span>
                                        }
                                    <p className="email-text">{tweet.email}</p>
                                    </div>
                                </div>
                            </div> 
                        );
                    };
                })};
            </section>
        </section>
    );
};

export default UserMainPage;