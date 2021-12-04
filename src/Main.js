import './Main-Home.css';
import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import bigLogo from "../src/svg/logo_big.svg";
import { loginConGoogle, auth, logout} from "./firebase";



function Main(props) {

    useEffect(() => {
        auth.onAuthStateChanged((usuario) => {
           props.setUser(usuario);
            console.log(usuario);
        });
    }, [])

    return (  
        <div className="container">     
            <div className="div-svg"> 
            <img className="img-style" src={bigLogo} alt="DEVSUnited Logo"/>
             </div>
            <div className="div-login"> 
            <h1>Primera pantalla </h1>
            <h3> subtitulo </h3>
            <div>
                {props.user ? (
                 <>
                 <div>
                     <img src={props.user.photoURL} alt="foto"/>
                     <p>!hola {props.user.displayName}!</p>
                     <button className="gButton" onClick={logout}>Log Out</button>
                 </div>
                 </>
                ) : (

                <button className="gButton" onClick={loginConGoogle}>Login con Google</button>
                )}
            </div>

          
            <Link to="/home">Ir a segunda pantalla</Link>
            </div>
        </div>
    )
}

export default Main;