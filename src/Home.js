import './Main-Home.css';
import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import bigLogo from "../src/svg/logo_big.svg";
import {loginConGoogle, auth, logout} from './firebase';
import black from "../src/svg/google_sign_in.svg";





function Home(props) {

    // useEffect(() => {
          
    // }, [])

    return (  
        <div className="container">     
            <div className="cont-login"> 
                <img className="img-style" src={bigLogo} alt="DEVSUnited Logo"/>
            </div>
            <div className="cont-login"> 
                <div className="div-login"> 
                <h1>Lorem Ipsum Dolor </h1>
                <h3> Lorem ipsum dolor sir amet, consectetur adipiscing elit </h3>
                <div>
             </div>
                {props.user ? (
                 <>
                 <div>
                     <img src={props.user.photoURL} alt="foto"/>
                     <p>!hola {props.user.displayName}!</p>
                     <button className="gButton" onClick={logout}>Log Out</button>
                 </div>
                 </>
                ) : (

                    
                    <button className="gButton" onClick={loginConGoogle}>
                         <img  className="log-in"src={black} alt="Login with Google"/>
                   </button>
                )}
            </div>
            <Link to="/Twitter">Go to feed</Link>

            </div>
        </div>
    )
}
            
            



export default Home;