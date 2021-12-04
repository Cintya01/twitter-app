import './App.css';
// import {firestore} from './firebase';
import React, { useState} from 'react';
import {Routes, Route} from 'rea'
import Twitter from './Tweets';

function App() {

  const [msn, setMsn] = useState ([]);
  const [tweet, setTweet] = useState({ tweet:"", autor:""});
  const [user, setUser] = useState(null);
  
  
  return (
    <div className="App"> 
    <Routes>
      <Route exact path="/">
        <Route exact path="/" 
         element= 
            {<Main 
              user={user} 
              setUser={setUser}/>}/>
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