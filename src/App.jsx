import '../src/Styles/App.css';
// import {firestore} from './firebase';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import LoginWelcome from './Login/Login-Welcome';
import UserMainPage from './UsersPages/UserMainPage';
import Twitter from './Tweets/Tweets';
import OtherUserPage from './UsersPages/OtherUserPage';
import UserMainPageFav from './UsersPages/UserMainPage-Fav';

function App() {
  
 return (
    <div className="App">     
      <Routes>          
          <Route exact path="/" element= {<LoginWelcome/>}/>               
          <Route path="/twitter" element= {<Twitter/>}/>
          <Route path="/UserMainPage" element= {<UserMainPage/>}/>
          <Route path="/UserMainPageFav" element= {<UserMainPageFav/>}/>
          <Route path="/OtherUserPage" element= {<OtherUserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;