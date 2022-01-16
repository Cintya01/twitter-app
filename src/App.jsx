import '../src/Styles/App.css';
// import {firestore} from './firebase';
import React, { useState } from 'react';
import {Route, Routes} from "react-router-dom";
import Main from './Main';
import UserMainPage from './UserMainPage';
import Twitter from './Tweets';



function App() {

  const [msn, setMsn] = useState ([]);
  const [tweet, setTweet] = useState({  autor: "",
    tweet: "",
    dateCreated: "",
    likes: 0,
    userId: "",
    email: ""});
  const [user, setUser] = useState(null);
 
 
  
 return (
    <div className="App"> 
    
    <Routes>      
        <Route exact path="/"
         element= 
          {<Main    
              user={user} 
              setUser={setUser}
              />}/>               
        <Route path="/home" 
        element= {<UserMainPage 
              user={user} 
              setUser={setUser}/>}/>
        <Route path="/twitter" 
        element=  
          {<Twitter 
              user={user} 
              tweets={msn} 
              setTweets={setMsn}
              tweet={tweet}
              setTweet={setTweet}
              />}/>
      </Routes>
     </div>
  );
}

export default App;