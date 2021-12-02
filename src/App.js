import './App.css';
// import {firestore} from './firebase';
import React, { useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Main from './Main';
import Home from './Home';
import Twitter from './Tweets';


function App() {

  const [msn, setMsn] = useState ([]);
  const [tweet, setTweet] = useState({ tweet:"", autor:""});
  
  return (
    <div className="App"> 
    <Routes>
      <Route exact path="/">
        <Route exact path="/" element= {<Main />}/>
      </Route> 
      <Route path="/home">
        <Route path="/home" element= {<Home />}/>
      </Route>       
      <Route path="/twitter"> 
      <Route path="/twitter" 
      element=  
        {<Twitter 
            tweets={msn} 
            setTweets={setMsn}
            tweet={tweet}
            setTweet={setTweet}/>}/>
      </Route> 
    </Routes>
     </div>
  );
}

export default App;