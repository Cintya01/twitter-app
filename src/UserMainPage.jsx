import '../src/Styles/App.css';
// import React from 'react';
// import {useNavigate} from "react-router-dom";

// import borrar from "../src/Resources/svg/delete.svg";
// import defaultPhoto from "../src/Resources/svg/profilePicDefault.svg";
// import ProfilePic from "../src/Resources/svg/ornacia.png"
// import logo from "../src/Resources/svg/Logo_Alone.svg"
// import name from "../src/Resources/svg/Name_Logo.svg"
// import heart from "../src/Resources/svg/heart.svg"



function UserMainPage(props) {

    <h1>userpage</h1>


//     let navigate = useNavigate();

//   let changeUsername = (event) => {
//     console.log(event)
//   }


//   function handleClick() {
//       navigate("/UserMainPage");
//   }

//   return (
//     <div>
//         <div className="header-cont flex">
//     <nav className="header-nav-cont flex">
//         <img className="profile-img-header" src={ProfilePic} alt="Profile Pic" />
//         <img className="logo-cont-header" src={logo} alt="Logo"/>
//         <img className="devs-header" src={name} alt="DEVSUNITED"/>
//     </nav>
//     </div>
//         <div className="form-cont flex">
//         <img className="profile-img" src={ProfilePic} alt="Profile Pic"/>
//             <form>
//                 <textarea
//                     name="tweet"
//                     onChange={handleChange}
//                     value= {props.tweet.tweet}
//                     cols="30"
//                     rows= "5"
//                     placeholder="What's Happening?..."
//             />
//             <div>200 max</div>
//             <div>
//                 {/* <input 
//                     name="autor"
//                     onChange={handleChange}
//                     value= {props.tweet.autor}
//                     type="text"
//                     placeholder="persona autora"
//                  /> */}
                
//                 <button className="btn-post silk-font" onClick={sendTweet}> POST </button>
//                 </div>
//             </form>
//         </div>

//         <section className="tweet-cont flex">           
//         {/* {props.tweets.map((tweet) => {

//             let date = tweet.dateCreated.toDate().toLocaleDateString();
               

                              
//             let formatDate = (date) => {
//                 try{
//                     if(date instanceof Date) return date;
//                     //si no es date, es fecha de Firebase y debe convertirse.
//                     return date.toDate().toLocaleDateString();
//                 }catch(e){
//                     console.log(e);
//                     return "";
//                 }
//             }
            

//            return (   
                         
//                 <div className="tweet-cont-ind flex" key={tweet.id}>
//                 <img className="profile-img" src={defaultPhoto} alt="profile pic"/>
//                 <p className="username">{tweet.autor}</p>
//                     <span>date : {date}</span>
//                     <div className='flex'>
//                     <p>{tweet.tweet}</p>
//                     </div>
//                 <div className="acciones">
//                     {tweet.userId === props.user.uid ?
//                     <span onClick={() => deleteTweet(tweet.id)} className="delete">
//                         <img className="delete" src={borrar} alt="delete"/>
//                     </span> : null
//                     }
//                     {tweet.userId !== props.user.uid ?
                    
//                     <span onClick={() => likeTweet(tweet.id, tweet.likes)} className="likes" >
//                     <img height="13px" src={heart} alt="" />
//                     <span>{tweet.likes ? tweet.likes : 0}    </span>
//                     <p className="username">{tweet.email}</p>
//                     </span>
//                     : null}
//                 </div>
//                 </div>
//           );
//         })}; */}
//         </section>
        
       
//     </div>
//   );

}
export default UserMainPage;