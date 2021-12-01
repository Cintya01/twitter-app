import './App.css';
// import {firestore} from './firebase';
import React, { useState} from 'react';
import Twitter from './Tweets';
import Header from './Header';

function App() {

  const [msn, setMsn] =useState ([])
  
  return (
    <div className="App">  
      <Header/>
       <Twitter tweets={msn} setTweets={setMsn}/>
     </div>
  );
}

export default App;