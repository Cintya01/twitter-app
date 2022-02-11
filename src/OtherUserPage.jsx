import '../src/Styles/App.css';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import heartred from "../src/Resources/svg/heart_red.svg";
import heartwhite from "../src/Resources/svg/heart_white.svg";
import back from "../src/Resources/svg/back.svg";


function OtherUserPage() {

    const {user, tweets, deleteTweet,likeTweet, getUserPhoto, getUserNick,selectedOtherUser} = useContext(AppFirebaseContext);


    let navigate = useNavigate();

    function handleClick() {        
        navigate("/Twitter");        
    }
    if(!user) {
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
          
        <div>
            <div className="header-cont flex">
            <nav className="header-nav-cont flex"> 
                <img className="svg-usermainpage" src={back} onClick={handleClick} alt="Back" />
                <p className="silk-font" > {getUserNick(selectedOtherUser)}  </p>          
            </nav>
        </div>
            <div className="form-cont">
            <img className="usermainpage" src={getUserPhoto(selectedOtherUser)} style={getBgPhotoStyle(selectedOtherUser.colorPick)} alt="Profile Pic" onClick={handleClick}/>
            <div className='color-nickname center flex silk-font'>
            <p style={getBgStyle(selectedOtherUser.colorPick)}> {getUserNick(selectedOtherUser)}  </p> 
            </div>
            
            </div>

            <section className="tweet-cont flex">  

            {tweets.map((tweet) => {

if(tweet.userId === selectedOtherUser.uid) {
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
                            <p className="username" onClick={handleClick} style={getBgStyle(tweet.colorPick)}>{tweet.autor}</p>       
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
              )};
            })}
            </section>
            
           
        </div>
      );
}

export default OtherUserPage;