import '../src/Styles/Main-Home.css'
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import bigLogo from "../src/Resources/svg/logo_big.svg";
import {firestore, loginConGoogle, auth} from './firebase';
import black from "../src/Resources/svg/google_sign_in.svg";

function Main(props) {

    const [authenticated, setAuthenticated] = useState(false);


    
  let navigate = useNavigate();

  let changeUsername = (event) => {
    console.log(event)
  }


  function handleClick() {
      navigate("/twitter");
  }

  let logout = () => {
      setAuthenticated(false);
      props.setUser(null);
      auth.signOut();
  }
      
    useEffect(() => {  
           auth.onAuthStateChanged((usuario) => {
           if(!usuario) return;
           setAuthenticated(true);
           firestore.collection("Users-s4").doc(usuario.uid).get().then((docRef) => {
               //si usr existe, obtener datos y meterlos al props
               if(docRef.exists){
                    console.log("firestoreDocs",docRef.data());
                    let data = docRef.data();
                    props.setUser(data);
               }else{
                   //usr no existe, guardar datos en firebase y luego setear en props.
                let userObject = {
                    email:usuario.email,
                    uid:usuario.uid,
                    userName:usuario.displayName}
                //guardar user, pass, uid
                firestore.collection("Users-s4").doc(userObject.uid).set(userObject,{merge:true}).then((docRef)=>{
                    props.setUser(userObject);
                })
               }
           })
           
           
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
                 
                <p className="text-title white">WELCOME <span> {props.user.userName}! </span></p>
                <input className="input-type" type="text" placeholder='Type your username' value={props.user.userName} onChange={changeUsername}/>

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