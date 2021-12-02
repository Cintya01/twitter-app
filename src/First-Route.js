import './Main-Home.css';
import React from 'react';
import {Navigate, Outlet} from "react-router-dom";


const firstRoute = () => {
    const auth = null;
    return  auth ? <Outlet /> : <Navigate to="/home" />
     
}

export default firstRoute;