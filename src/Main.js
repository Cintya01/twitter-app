import './Main-Home.css';
import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import bigLogo from "../src/svg/logo_big.svg";
import {loginConGoogle, auth, logout} from './firebase';
import black from "../src/svg/google_sign_in.svg";





function Main(props) {

    useEffect(() => {
        auth.onAuthStateChanged((usuario) => {
           props.setUser(usuario);
            console.log(usuario);
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
                <h1>Lorem Ipsum Dolor </h1>
                <h3> Lorem ipsum dolor sir amet, consectetur adipiscing elit </h3>
                <div>
             </div>
                {props.user ? (
                 <>
                 <div className="text-center">
                     <img src={props.user.photoURL} alt="foto"/>
                     <h2>!Hola {props.user.displayName}!</h2>
                     <button className="gButton" onClick={logout}>Log Out</button>
                 </div>
                 </>
                ) : (
                    <button  className="gButton" onClick={loginConGoogle}>
                         <img  className="log-in" src={black} alt="Login with Google"/>
                   </button>
                )}
                </div>

                <div className="position">
                    <p>© 2020 Devs_United -  <span>BETA</span> </p>  
                </div>
                
            </div>
          
            {/* <Link to="/home">Ir a segunda pantalla</Link> */}
          
            
            </div>
        </div>
    )
}

export default Main;