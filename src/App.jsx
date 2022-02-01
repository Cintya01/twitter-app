import '../src/Styles/App.css';
// import {firestore} from './firebase';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from './Login/Login-Welcome';
import UserMainPage from './UserMainPage';
import Twitter from './Tweets';



function App() {
  
 return (
    <div className="App"> 
    
    <Routes>      
        <Route exact path="/" element= {<Main/>}/>               
        <Route path="/twitter" element= {<Twitter/>}/>
        <Route path="/UserMainPage" element= {<UserMainPage/>}/>
      </Routes>
     </div>
  );
}

export default App;