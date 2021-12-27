import '../src/Styles/Main-Home.css'
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import bigLogo from "../src/Resources/svg/logo_big.svg";
import {loginConGoogle, auth, logout} from './firebase';
import black from "../src/Resources/svg/google_sign_in.svg";


function Main(props) {

    const [authenticated, setAuthenticated] = useState("");
     
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
                
               
             {props.user ? (
                 <>
                 <h1>Lorem Ipsum Dolor </h1>
                <h3> Lorem ipsum dolor sir amet, consectetur adipiscing elit </h3>
                 <div className="text-center">
                     <img src={props.user.photoURL} alt="foto"/>
                     <h2>!Hola {props.user.displayName}!</h2>
                     <button className="gButton" onClick={logout}>Log Out</button>
                 </div>
                 </>
                ) : (
                    <>
                    <h1>Lorem Ipsum Dolor </h1>
                    <h3> Lorem ipsum dolor sir amet, consectetur adipiscing elit </h3>
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
          
          <Navigate to={authenticated ? "/home" : "/"}/>         
            
            </div>
        </div>
    )
}

export default Main;