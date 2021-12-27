import { Navigate} from 'react-router-dom';
import React  from 'react';
// import {Route, Routes, useRoutes} from "react-router-dom";
// import Main from './Main';
import Home from './Home';
// import Twitter from './Tweets';
import Error from './Error';



// const [msn, setMsn] = useState ([]);
// const [tweet, setTweet] = useState({ tweet:"", autor:""});
// const [user, setUser] = useState(null);


// <Routes>      
// <Route exact path="/" 
//  element= 
//     {<Main 
//       user={user} 
//       setUser={setUser}/>}/>    
// <Route path="/home" element= {<Home />}/>
// <Route path="/twitter" 
// element=  
//   {<Twitter 
//       tweets={msn} 
//       setTweets={setMsn}
//       tweet={tweet}
//       setTweet={setTweet}/>}/>
// </Routes>


const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <Home /> : <Navigate to="/home" />,
 },
  {
    path: '/',
    element: !isLoggedIn ? <Error /> : <Navigate to="/error" />,
    children: [
      { path: 'login', element: <Home /> },
      { path: '/', element: <Navigate to="/home" /> },
    ],
  },
];

export default routes;