import './Main-Home.css';
import React from 'react';
import {Link} from "react-router-dom";


function Main() {
    return (  
        <>     
        <div > Primera pantalla </div>
        <Link to="/home">Ir a segunda pantalla</Link>
        </>
    )
}

export default Main;