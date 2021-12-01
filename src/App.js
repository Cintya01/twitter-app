import './App.css';
// import {firestore} from './firebase';
import React, { useState} from 'react';
import Twitter from './Tweets';
import Header from './Header';

function App() {

  const [msn, setMsn] = useState ([]);
  const [tweet, setTweet] = useState({ tweet:"", autor:""});
  
  return (
    <div className="App">  
      <Header/>
      <Twitter 
          tweets={msn} 
          setTweets={setMsn}
          tweet={tweet}
          setTweet={setTweet}/>
          
     </div>
  );
}

export default App;