import './App.css';
// import {firestore} from './firebase';
import React, { useState} from 'react';
import Twitter from './Tweets';

function App() {

  const [msn, setMsn] =useState ([])
  
  return (
    <div className="App">      
       <Twitter tweets={msn} setTweets={setMsn}/>
     </div>
  );
}

export default App;