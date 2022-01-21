 // MAIN LOG IN - WELCOME - COLOR AND NICKNAME SET

import '../src/Styles/Main-Home.css'
import React, {useContext} from 'react';
import { AppFirebaseContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";
import bigLogo from "../src/Resources/svg/logo_big.svg";
import {loginConGoogle, auth} from './firebase';
import black from "../src/Resources/svg/google_sign_in.svg";

function Main() {

    const {user, setUser, changeUsername, authenticated, setAuthenticated, nickName} = useContext(AppFirebaseContext)

   
  let navigate = useNavigate();

 function handleClick() {
      navigate("/twitter");
  }

  let logout = () => {
      setAuthenticated(false);
      setUser(null);
      auth.signOut();
  }
      
    
    return (  
        
        <div className="container">     
            <div className="cont-login"> 
                <img className="img-style" src={bigLogo} alt="DEVSUnited Logo"/>
            </div>
            <div className="cont-login"> 
                <div>                 
                 <div className="div-login"> 
               
             {user && authenticated ? (
                 <>
                 
                <p className="text-title white">WELCOME <span> {user.name}! </span></p>
                         
                <input 
                    className="input-type" 
                    type="text" 
                    id="nickNameElement" 
                    placeholder='Type your username' 
                    onChange={changeUsername}
                    value={nickName}
                    />
                
                <p id="valueInput"></p>
               

                <p>Select your favorite color</p>
                <div className="color-cont">
                    <button className="color-square"></button>
                    <button className="color-square"></button>
                    <button className="color-square"></button>
                    <button className="color-square"></button>
                    <button className="color-square"></button>
                    <button className="color-square"></button>
                </div>

                <button className="gButton" onClick={handleClick} >Continue</button>
                <button className="log-out" onClick={logout}>Log Out</button>
                </>
                ) : (
                    <>
                    <h1 className="text-title white">Lorem Ipsum Dolor </h1>
                    <h3 className="white"> Lorem ipsum dolor sir amet, consectetur adipiscing elit </h3>
                   <button  className="gButton" onClick={loginConGoogle}>
                         <img  className="log-in" src={black} alt="Login with Google"/>
                   </button>
                   </>
                )}
                </div>

                <div className="position">
                    <p>© 2020 Devs_United -  <span>BETA</span> </p>  
                </div>
                
            </div>
              
            </div>
            
        </div>

       
    )
}

export default Main;