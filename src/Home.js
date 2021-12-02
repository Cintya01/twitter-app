import './Main-Home.css';
import React from 'react';
import { Link} from "react-router-dom";


function Home() {
    return (
        <>
        <div > Segunda Pantalla </div>
        <Link to="/Twitter">Go to feed</Link>
        </>
    )
}

export default Home;