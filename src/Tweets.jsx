import '../src/Styles/App.css';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import React, {useContext, useState} from 'react';
import borrar from "../src/Resources/svg/delete.svg";
import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
import logo from "../src/Resources/svg/Logo_Alone.svg" 
import name from "../src/Resources/svg/Name_Logo.svg"
import heartred from "../src/Resources/svg/heart_red.svg"
import heartwhite from "../src/Resources/svg/heart_white.svg"

function Twitter() {

    const {user, tweets, setTweet, sendTweet, showDeletePopUp,likeTweet, tweet, getUserPhoto, checkedLike,getUserByID,selectedOtherUser} = useContext(AppFirebaseContext);
    let [letterCount, setLetterCount] = useState(0);

    let navigate = useNavigate();

    function handleClickMainProfile() {
         navigate("/UserMainPage")
       }

    function handleClickOtherProfile(tweet) {    
      if (tweet.userId === user.uid){
       navigate("/UserMainPage")
      } else if (tweet.userId !== user.uid){
       getUserByID(tweet.userId)
       if(!!selectedOtherUser){
        navigate("/OtherUserPage")
       }else{
           console.log("error")
       }
       
      } else if(!user){
       navigate("/")
      }
    };
             

    const handleChange = (e) =>{
        let newTweet = {
            ...tweet,
            [e.target.name]: e.target.value
        };
        setTweet(newTweet);
        letterCount = 0;
        if(e.target.value){
            setLetterCount(e.target.value.length)
        }else{
            setLetterCount(0)
        }
    };

    let getBgPhotoStyle = (colorHex)  => {
        return {
            border: '2px solid' +colorHex
        }
    }
    
      return (
        <div>
            <div className="header-cont flex">
                <nav className="header-nav-cont flex space-around">
                    {user.photoURL === "" ?
                        <img className="profile-img-header" src={""} alt="profile pic" onClick={handleClickMainProfile}  /> :
                        <img className="profile-img-header" src={getUserPhoto(user)} style={getBgPhotoStyle(user.colorPick)} alt="profile pic" onClick={handleClickMainProfile} /> }
                    <img className="logo-cont-header" src={logo} alt="Logo"/>
                    <img className="devs-header" src={name} alt="DEVSUNITED"/>
                </nav>
            </div>
            <div className="form-cont flex">
            <img className="profile-img" src={getUserPhoto(user)} alt="Profile Pic" onClick={handleClickMainProfile}/>
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

                <progress  value={letterCount} min="0" max="200" className='flex'></progress>
                <div className='flex count-position'>
                <p>{letterCount.toString()}</p>
                <div className='max flex'>200 max.</div>
                </div>
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
        

        let getBgStyle = (colorHex)  => {
            return {
                backgroundColor:colorHex,
                boxShadow: '0 4px 0px -2px '+colorHex
            }
        }

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
                            <p className="username" onClick={() => handleClickOtherProfile(tweet)} style={getBgStyle(tweet.colorPick)}>{tweet.autor}</p>       
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
                        
                        <span onClick={() => likeTweet(tweet.id, tweet.likes)} onChange={checkedLike} className="flex" >
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

