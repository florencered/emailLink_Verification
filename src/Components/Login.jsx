import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth' 
import {auth} from "../FirebaseConfig"; 
//useeffect hook 
import { useEffect } from 'react'; 
//import navigate to navigate through diffrent places via recat router dom 
import { useNavigate,useLocation } from 'react-router-dom'; 
import { useState } from 'react'; 
import './login.scss'
import { isSignInWithEmailLink, sendSignInLinkToEmail,signInWithEmailLink } from 'firebase/auth';
const Login = () => {  
  //usestate for setting up the email 
  const [email,setEmail]=useState(''); 
  //useState for loading and logging error and check when the message has been sent
  const [loginLoading,setLoginLoading]=useState(false);
  const [loginError,setLoginError]=useState(''); 
  const [infoMsg,setInfoMsg]=useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState('');
  //fetching which user using the custom hook,since we have entered the login page already we do not need the usenavigate hook 
  const [user]=useAuthState(auth); 
  //calling the navigate function  
  const navigate=useNavigate();
  const location = useLocation();
  const {search} = location;
  //to check if the user is signed in at the beginning of the function
  useEffect(()=>{
      if(user){
        //user already signed in 
        navigate('/');
      } 
      else{ 
         //after clicking the link on the email,the page will reload,
         //useeffect hook will run once again,but user at the beginning 
         //of the page wont be there 
         //user is not signed in but the link is valid 
         //window.location.href returns url of the current page
         //checks of th url of the current email id a valid email
         if(isSignInWithEmailLink(auth,window.location.href)){ 
         //get value of the email entered,it must be stored in the localstorage of the browser 
          let email=localStorage.getItem('email'); 
          //if no email is there
          if(!email){
            //incase the user clicks the email link on a different device,we will ask for valid email 
            email=window.prompt("please provide your email");
          } 
          //after that we will complete the login process 
          setInitialLoading(true);
          signInWithEmailLink(auth,localStorage.getItem('email'),window.location.href)
          .then((result)=>{
              // we can get the user from result.user but no need in this case
          console.log(result.user); 
          //once the work is done,remove the email and go back to homepage
          //since we dont have any other pages to redirect the user to
          localStorage.removeItem('email');
          setInitialLoading(false);
          setInitialError('');
          navigate('/');
        }).catch((err)=>{
          setInitialLoading(false);
          setInitialError(err.message); 
          //if there is an error,keep the user n login page
          navigate('/login');
        })
      }
        else{
          console.log('enter email and sign in');
        }

         }     
      
  },[user,search,navigate]);
  // the function which manages everything after the form is submitted 
  const handleLogin=(e)=>{ 
    //prevents the form from submitting to an external page
    e.preventDefault(); 
    //just after the user clicks submit  
    setLoginLoading(true);
    sendSignInLinkToEmail(auth,email,{ 
      //the url we will redirect back to after clicking on the link in the email
      url:'http://localhost:3000/login', 
      //should be true as a rule
      handleCodeInApp: true,
    })
    .then(() => {
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      // alert("link is sent check your email");
      window.localStorage.setItem('email', email); 
      setLoginLoading(false);
      setLoginError(''); 
      setInfoMsg('we have sent you an email with a link to sign in');
     
    })
    .catch((error) => {
      const errorMessage = error.message; 
      setLoginLoading(false);
      setLoginError(errorMessage);
    });;

  }
  return ( 
    // creating a form for entering details 
  <div className="container">
    <div className="box"> 
    {initialLoading?(
        <div>Loading...</div>
      ):(
        <>
          {initialError!==''?(
            <div className='error-msg'>{initialError}</div>
          ):(
            <>
              {/* We are checking user because for a split second, we will not have user */}
              {user?(
                // so instead of seeing form, I am using this please wait msg
                <div>Please wait...</div>
              ):(
                // for a split second we will see this form
                <form className='form-group custom-form' onSubmit={handleLogin}>
                  <label>Email</label>
                  <input type={'email'} required placeholder='Enter Email'
                  className='form-control'
                  value={email||''} onChange={(e)=>setEmail(e.target.value)}/>
                  <button type='submit' className='btn btn-success btn-md'>
                    {loginLoading?(
                      <span>Logging you in</span>
                    ):(
                      <span>Login</span>
                    )}
                  </button>
                  {/* show login error msg */}
                  {loginError!==''&&(
                    <div className='error-msg'>{loginError}</div>
                  )}

                  {/* show info msg */}
                  {infoMsg!==''&&(
                    <div className='info-msg'>{infoMsg}</div>
                  )}
                </form>
              )}
            </>
          )}
        </>
      )}
    </div> 
    </div>
  )
}

export default Login