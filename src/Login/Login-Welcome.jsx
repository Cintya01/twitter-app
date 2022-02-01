 // MAIN LOG IN - WELCOME - COLOR AND NICKNAME SET

import '../Styles/Main-Home.css'
import React, {useContext, useState} from 'react';
import { AppFirebaseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import bigLogo from "../Resources/svg/logo_big.svg";
import {loginConGoogle, auth} from '../firebase';
import black from "../Resources/svg/google_sign_in.svg";
import {colorHexList} from "../colorList";
import ColorPicker from '../Color';
import {firestore} from '../firebase.js';


function Main() {

    const {user, setUser, authenticated, setAuthenticated, nickName,  changeUsername, setColorPick, colorPick } = useContext(AppFirebaseContext)
    const [colors, setColors] = useState(colorHexList);
    let navigate = useNavigate();

   

     let logout = () => {
        setAuthenticated(false);
        setUser(null);
        auth.signOut();
     }

     //Elección de color

     const setColor = (e, color) =>{
         const cId = e.target.id;
         console.log(e.target.id);

        let newColorList = colors.map((color) => {
            if (cId === color.hex) {
               
                return {                   
                    n: color.n,
                    hex: color.hex,
                    choose: !color.choose 
                }               
            } else {
                return {
                    n: color.n,
                    hex: color.hex,
                    choose: false 
                }
            }
        })
        setColors(newColorList);
        setColorPick( color );
     };

     //Setea color de Usuario y envía a Firebase para refrescar toda la data

     const HandleColorNickChangebyUser = () => {  
        
        firestore.collection("Users-s4").doc(user.uid).set({
            photoURL: user.photoURL,
            name: user.name,                       
            uid : user.uid,
            email : user.email,
            nickName: user.nickName,
            colorPick: colorPick.hex
        });
       
        navigate("/twitter")
        
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
                <ul>
                   {colors.map((color) =>
                        <ColorPicker
                            color ={color}
                            handleColor= {setColor}
                            key={color.hex}
                            n={color.n}/>
                   )}
              </ul>
                </div>
                
               
                <button className="gButton" onClick={HandleColorNickChangebyUser} >Continue</button>
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