import '../src/Styles/Main-Home.css'
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import bigLogo from "../src/Resources/svg/logo_big.svg";
import {loginConGoogle, auth, logout} from './firebase';
import black from "../src/Resources/svg/google_sign_in.svg";


function Main(props) {

    const [authenticated, setAuthenticated] = useState("");


    
  let navigate = useNavigate();


  function handleClick() {
      navigate("/twitter");
  }
      
    useEffect(() => {  
           auth.onAuthStateChanged((usuario) => {
           props.setUser(usuario);
           setAuthenticated(true);
        });
         // eslint-disable-next-line 
    }, [])

    return (  
        
        <div className="container">     
            <div className="cont-login"> 
                <img className="img-style" src={bigLogo} alt="DEVSUnited Logo"/>
            </div>
            <div className="cont-login"> 
            <div> 
                
                <div className="div-login"> 
                
               
             {props.user && authenticated ? (
                 <>
                 
                <p className="text-title white">WELCOME <span> {props.user.displayName}! </span></p>
                <input className="input-type" type="text" placeholder='Type your username'/>

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