import React from 'react'
// a custom firebase hook to check if the user is signed in or not 
import {useAuthState} from 'react-firebase-hooks/auth' 
//calling the auth function everywhere after declaring it in the firebase config folder 
import {auth} from "../FirebaseConfig"; 
import { useNavigate } from 'react-router-dom';
//will navigate to a diffrent page,we can use it with click function 
import './home.scss';
import {signOut} from "firebase/auth"; 
import { useState } from 'react';
const Home = () => { 
  //fetching the status of user using the custom hook 
  const [user,loading,error]=useAuthState(auth);
  const [logoutMsg,setLogoutMsg]=useState('');
  // checking if info is correctly obtained 
  console.log(user);
  console.log(loading);
  console.log(error); 
  const navigate=useNavigate(); 
  const signUserOut= async ()=>{
    await signOut(auth);
    setLogoutMsg('You have been signed out successfully'); 
    alert("You have been signed out successfully")
  }
  
  return ( 
    <div className="container">
    <div className="box"> 
    {/* //if loading is true we will show loading/pls wait,else check if the user is there or not  */} 
    {loading?
    (<div>Loading..</div>):
    (
      <> 
      {/* //at the end once email verification is done */}
      {user?(<div>
       
        <button  className='btn btn-danger btn-md' onClick={signUserOut}>
          SIGN OUT
        </button> 
        {logoutMsg!==''&&(
                    <div className='logout-msg'>{logoutMsg}</div>
                  )}
        </div>):
      (<button className='btn btn-primary btn-md'onClick={()=>navigate('/login')}>LOGIN</button>)
      } 
      </>
    )
    }


    </div> 
    </div>
  )
}

export default Home