import '../src/Styles/Main-Home.css';
import React from 'react';
// import {Navigate} from "react-router-dom";
import bigLogo from "../src/Resources/svg/logo_big.svg";


function Home(props) {
   return (  
        <div className="container">     
            <div className="cont-login"> 
                <img className="img-style" src={bigLogo} alt="DEVSUnited Logo"/>
            </div>
            <div className="cont-login"> 
            <div> 
                       
                <div className="div-login"> 
                <h1>WELCOME </h1>
                <h3> {props.user} </h3>
                <div>
                <div className="text-center">
                     <img  alt="foto"/>
                     <h2>!Hola mmm!</h2>
                     <button className="gButton">Log Out</button>
                 </div>
             </div>          
             
                   <button  className="gButton" > Continue </button>
              
                </div>

                <div className="position">
                    <p>© 2020 Devs_United -  <span>BETA</span> </p>  
                </div>
                
            </div>
          
            {/* <Navigate to={"/Twitter"}/>   */}
          
            
            </div>
        </div>
    )
}

export default Home;