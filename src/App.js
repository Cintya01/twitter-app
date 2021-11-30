import './App.css';
import {firestore} from './firebase';
import React, {useEffect, useState} from 'react';

function App() {
  const [msn, setMsn] =useState ([])
  
  useEffect (() => {
    firestore.collection("Tweets-s4")
    .get()
    .then ((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        setMsn(doc.data());
      });
    });

  },[msn])


  return (
    <div>
      <header>
         <p>{msn.tweet}</p>
      </header>
    </div>
  );
}

export default App;